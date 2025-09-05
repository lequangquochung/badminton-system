import { PipelineStage } from 'mongoose';
import MatchModel, { IMatch, IPairMatch } from '../models/matches.mode';
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
        search: string,
        page: number,
        limit: number
    ) {
        try {
            const result = await MatchesRepository.getHistoryMatches(search, page, limit);
            return result;
        } catch (error: any) {
            throw new Error("Error getHistoryMatches: " + error.message);
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