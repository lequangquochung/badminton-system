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

    async getPairWinRate(firstPair: [string, string], secondPair: [string, string]): Promise<IPairMatch> {
        const matches = await MatchModel.find({
            $or: [
                {
                    $and: [
                        { firstPlayer: { $in: firstPair } },
                        { secPlayer: { $in: firstPair } },
                        { thirdPlayer: { $in: secondPair } },
                        { fourthPlayer: { $in: secondPair } },
                    ],
                },
                {
                    $and: [
                        { firstPlayer: { $in: secondPair } },
                        { secPlayer: { $in: secondPair } },
                        { thirdPlayer: { $in: firstPair } },
                        { fourthPlayer: { $in: firstPair } },
                    ],
                },
            ],
        });
        
        let firstPairWins = 0;
        let secondPairWins = 0;

        matches.forEach(match => {
            const winner: string[] = match.winner; // giả sử winner là array chứa tên 2 người thắng

            const isFirstPairWinner = firstPair.every(p => winner.includes(p));
            if (isFirstPairWinner) {
                firstPairWins++;
            } else {
                secondPairWins++;
            }
        });

        const totalMatches = matches.length;

        const result: IPairMatch = {
            firstTeamPairWins: firstPairWins,
            secTeamPairWins: secondPairWins,
            matchesPlayed : totalMatches,
            winRateFirstTeamPair:
                totalMatches > 0 ? ((firstPairWins / totalMatches) * 100).toFixed(2) : "0.00",
            winRateSecTeamPair:
                totalMatches > 0 ? ((secondPairWins / totalMatches) * 100).toFixed(2) : "0.00",
        };

        return result;
    }

}

export default new MatchesRepository();