import { PipelineStage } from "mongoose";
import MatchModel, { IMatch, IPairMatch } from "../models/matches.mode";

class MatchesRepository {

    async createMatch(matchData: IMatch): Promise<IMatch> {
        const match = new MatchModel(matchData);
        return await match.save();
    }

    async getHistoryMatches(pipeline: PipelineStage[]): Promise<{
        data: IMatch[];
        totalCount: number;
        page: number;
        totalPage: number;
    }[]> {
        return await MatchModel.aggregate(pipeline);
    }

    async getPairWinRate(firstPlayer: string, secPlayer: string): Promise<IPairMatch> {
        const matches = await MatchModel.find({
            $or: [
                { $and: [{ firstPlayer: firstPlayer }, { secPlayer: secPlayer }] },
                { $and: [{ firstPlayer: secPlayer }, { secPlayer: firstPlayer }] },
                { $and: [{ thirdPlayer: firstPlayer }, { fourthPlayer: secPlayer }] },
                { $and: [{ thirdPlayer: secPlayer }, { fourthPlayer: firstPlayer }] },
            ]
        });

        let matchWinTogether = 0;
        matches.forEach(match => {
            let bothInWinner = [firstPlayer, secPlayer]
                .every(p => match.winner.includes(p));
            if (bothInWinner) {
                matchWinTogether++;
            }
        })
        const result: IPairMatch = {
            matchesWon: matchWinTogether.toString(),
            matchesLost: (matches.length - matchWinTogether).toString(),
            matchesPlayed: matches.length.toString(),
            winRate: matches.length > 0 ? ((matchWinTogether / matches.length) * 100).toFixed(2) : "0.00"
        };
        return result;
    }

}

export default new MatchesRepository();