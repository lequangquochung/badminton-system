import mongoose, { mongo, PipelineStage } from "mongoose";
import PlayerModel, { IPlayer } from "../models/player.model";
import playerService from "../services/player.service";

class PlayersRepository {
    /**
     * Add player to league.
     */
    async addPlayer(payload: IPlayer): Promise<IPlayer> {
        const player = new PlayerModel(payload);
        return await player.save();
    }

    /**
     * Get all players.
     */
    async getAll(pipeline: PipelineStage[]): Promise<{
        data: IPlayer[];
        totalCount: number;
        page: number;
        totalPage: number;
    }[]> {
        return await PlayerModel.aggregate(pipeline);
    }
    /**
     * Get player by ID.
     */
    async findById(id: string) {
        return await PlayerModel.findById(id);
    }

    /**
     * get Id player
     */
    async findByName(name: string): Promise<IPlayer | null> {
        return await PlayerModel.findOne({ name: name });
    }

    /**
     * history matches by player ID.
     * @param id - Player ID
     */
    async getHistoryMatchesByPlayerId(playerId: string) {
        const pipeline = [
            {
                $match: { _id: new mongoose.Types.ObjectId(playerId) } // tìm player
            },
            {
                $lookup: {
                    from: "matches", // collection matches
                    let: { playerName: "$name" }, // tạo biến playerName từ players.name
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$firstPlayer", "$$playerName"] },
                                        { $eq: ["$secPlayer", "$$playerName"] },
                                        { $eq: ["$thirdPlayer", "$$playerName"] },
                                        { $eq: ["$fourthPlayer", "$$playerName"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "matchHistory"
                }
            }
        ];
        return await PlayerModel.aggregate(pipeline);
    }

    /**
     * update player data
     * @param id - Player ID
     * @param data - Partial player data to update
     */
    async updateDataPlayer(id: string, score: number): Promise<IPlayer | null> {
        await PlayerModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    score: score,
                    matchesPlayed: 1,
                    matchesWon: score === 21 ? 1 : 0,
                    matchesLost: score !== 21 ? 1 : 0,
                }
            },
            { new: true });
        const winRate = await this.getWinRate(id);
        return await PlayerModel.findByIdAndUpdate(
            id,
            {
                winRate: winRate
            },
            { new: true });
    }

    private async getWinRate(playerId: string): Promise<number> {
        const playerInfo = await playerService.getPlayerById(playerId);
        if (playerInfo) {
            const winRate = playerInfo?.matchesWon / playerInfo.matchesPlayed * 100;
            return parseFloat(winRate.toFixed(2)) || 0;
        }
        return 0;
    }


}

export default new PlayersRepository();