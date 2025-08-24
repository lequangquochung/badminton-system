import { PipelineStage } from "mongoose";
import { IPlayer, IPlayerHistory } from "../models/player.model";
import playersRepository from "../repositories/player.repository";
import UserModel from "../models/user.model";

class PlayerService {
    /**
     * add player to league 
     */
    async addPlayer(payload: IPlayer): Promise<IPlayer> {
        try {
            return await playersRepository.addPlayer(payload);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * get all players
     */
    async getAllPlayers(search: any | undefined,
        page: string,
        limit: string): Promise<
            {
                data: IPlayer[];
                totalCount: number;
                page: number;
                totalPage: number;
            }[]
        > {
        try {
            const matchCase: any = {};
            // TODO Search 
            // if (search) {
            //     matchCase.name = { $regex: search, $options: 'i' };
            // }
            const skip = (Number(page) - 1) * Number(limit);

            const pipeline: PipelineStage[] = [
                { $match: matchCase },
                {
                    $facet: {
                        data: [{ $skip: skip }, { $limit: parseInt(limit) }],
                        totalCount: [{ $count: 'count' }],
                    },
                },
            ];

            return await playersRepository.getAll(pipeline);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * get player by ID
     */
    async getPlayerById(id: string): Promise<IPlayer | null> {
        try {
            return await playersRepository.findById(id);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * get history matches by player ID
     * @param id - Player ID    
     */
    async getHistoryMatchesByPlayerId(id: string): Promise<IPlayerHistory[]> {
        try {
            return await playersRepository.getHistoryMatchesByPlayerId(id);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * update player data
     */
    async updateDataPlayer(id: string, score: number) {
        try {
            await playersRepository.updateDataPlayer(id, score);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * get player ID by name
     */
    async getPlyerId(name: string): Promise<IPlayer | null> {
        return await playersRepository.findByName(name);
    }


}

export default new PlayerService();