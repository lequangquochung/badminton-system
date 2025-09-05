import { NextFunction, Request, Response } from "express";
import { IMatch } from "../models/matches.mode";
import matchesService from "../services/matches.service";
import playerService from "../services/player.service";
import { HttpStatusCode } from "../utils/httpStatusCode.util";
import { sendSuccess } from "../utils/response.util";
import { MessageResponse } from "../utils/message.ultils";

class MatchesController {
    /**
     * create match
     */
    async createMatch(req: Request, res: Response, next: NextFunction) {
        try {
            // // update data player
            const requestData = req.body as IMatch;
            const matches: IMatch = await matchesService.createMatch(req.body);

            const playersName: any[] = [];
            playersName.push({
                name: requestData.firstPlayer,
                id: ""
            });
            playersName.push({
                name: requestData.secPlayer,
                id: ""
            });
            playersName.push({
                name: requestData.thirdPlayer,
                id: ""
            });
            playersName.push({
                name: requestData.fourthPlayer,
                id: ""
            });
            for (const [index, player] of playersName.entries()) {
                const playerObj = await playerService.getPlyerId(player.name);
                if (playerObj && playerObj.id) {
                    player.id = playerObj.id;
                }
                // checkTeamSide
                const teamSide = matchesService.checkTeamSide(index);
                await playerService.updateDataPlayer(playerObj?.id, teamSide ? req.body.secScore : req.body.firstScore);
            }

            // sendSuccess
            sendSuccess(res, HttpStatusCode.CREATED, matches, MessageResponse.MATCH_CREATED);
        } catch (error) {

            next(error);
        }
    }

    /**
     * get history matches
     */
    async getHistoryMatches(req: Request, res: Response, next: NextFunction) {
        try {
            const search = req.body?.search || "";
            const page = req.body?.page || 1;
            const limit = req.body.limit || 10;

            const result = await matchesService.getHistoryMatches(search, page, limit);
            sendSuccess(res, HttpStatusCode.OK, result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * get pair win rate
     */
    async getPairWinRate(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstPlayer, secPlayer } = req.body as {
                firstPlayer: string;
                secPlayer: string;
            };
            const result = await matchesService.getPairWinRate(firstPlayer, secPlayer);
            sendSuccess(res, HttpStatusCode.OK, { historyByTeam: result });
        } catch (error) {
            next(error);
        }
    }
}


export default new MatchesController();
