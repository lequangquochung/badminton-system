import { PipelineStage } from 'mongoose';
import MatchModel, { IMatch, IPairMatch } from '../models/matches.mode';
import { IPlayer } from '../models/player.model';
import MatchesRepository from '../repositories/matches.repository';
import PlayersRepository from '../repositories/player.repository';
import { ETEAM } from '../enum/eteam';


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

    public getWinner(firstScore: number, secScore: number): ETEAM {
        if (firstScore === 30) return ETEAM.FIRST_TEAM;
        if (secScore === 30) return ETEAM.SEC_TEAM;

        if (firstScore >= 21 || secScore >= 21) {
            console.log(Math.abs(firstScore - secScore) >= 2);
            
            if (Math.abs(firstScore - secScore) >= 2) {
                return firstScore > secScore ? ETEAM.FIRST_TEAM : ETEAM.SEC_TEAM;
            }
        } 
        throw new Error("Trận đấu chưa kết thúc, chưa thể xác định đội thắng!");
    }
    /**
     * check win rate by team
     */
    async getPairWinRate(firstPlayer: string, secPlayer: string): Promise<IPairMatch> {
        return MatchesRepository.getPairWinRate(firstPlayer, secPlayer);
    }
}

export default new MatchesService();