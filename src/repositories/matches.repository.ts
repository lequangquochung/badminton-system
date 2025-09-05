import { PipelineStage } from "mongoose";
import MatchModel, { IMatch, IPairMatch } from "../models/matches.mode";

class MatchesRepository {

    async createMatch(matchData: IMatch): Promise<IMatch> {
        const match = new MatchModel(matchData);
        return await match.save();
    }

    async getHistoryMatches(
        search: string,
        page: number,
        limit: number
    ): Promise<{
        data: IMatch[];
        totalCount: number;
        page: number;
        totalPage: number;
    }> {
        const matchCase: any = {};

        if (search) {
            matchCase.$or = [
                { firstPlayer: { $regex: search, $options: "i" } },
                { secPlayer: { $regex: search, $options: "i" } },
                { thirdPlayer: { $regex: search, $options: "i" } },
                { fourthPlayer: { $regex: search, $options: "i" } },
            ];
        }

        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Pipeline
        const pipeline: PipelineStage[] = [
            { $match: matchCase },
            { $sort: { matchDay: -1 } },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limitNum }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            },
            {
                $project: {
                    data: 1,
                    totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] }
                }
            }
        ];

        const result = await MatchModel.aggregate(pipeline);
        const { data, totalCount } = result[0];

        return {
            data,
            totalCount,
            page: pageNum,
            totalPage: Math.ceil(totalCount / limitNum),
        };
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