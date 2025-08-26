import { PipelineStage } from 'mongoose';
import { IMatch, IPairMatch } from '../models/matches.mode';
import { IPlayer } from '../models/player.model';
import MatchesRepository from '../repositories/matches.repository';
import PlayersRepository from '../repositories/player.repository';


class MatchesService {
    /**
     * create new match
     */
    async createMatch(payload: IMatch): Promise<IMatch> {
        try {
            // Ensure matchDay is a Date before passing to repository
            const matchData = {
                ...payload,
                matchDay: new Date(payload.matchDay),
            };
            // update data player
            return await MatchesRepository.createMatch(matchData as IMatch);
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * get history matches
     */
    async getHistoryMatches(
        search: any | undefined,
        page: string,
        limit: string): Promise<
            {
                data: IMatch[];
                totalCount: number;
                page: number;
                totalPage: number;
            }
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
                {
                    $project: {
                        data: 1,
                        totalCount: { $ifNull: [{ $arrayElemAt: ['$totalCount.count', 0] }, 0] }
                    }
                }
            ];
            const result = await MatchesRepository.getHistoryMatches(pipeline);
            
            return result[0];
        } catch (error: any) {
            throw new Error('Error: ' + error.message);
        }
    }

    /**
     * Check team side based on player information
     */
    public checkTeamSide(indexPlayer: number): number {
        let teamSide = 0; // Default to team A
        switch (indexPlayer) {
            case 0:
            case 1:
                teamSide = 0; // Team A
                break;
            case 2:
            case 3:
                teamSide = 1; // Team B
                break;
        }
        return teamSide;
    }

    /**
     * check win rate by team
     */
    async getPairWinRate(firstPlayer: string, secPlayer: string): Promise<IPairMatch> {
        return MatchesRepository.getPairWinRate(firstPlayer, secPlayer);
    }
}

export default new MatchesService();