import { NextFunction, Request, Response } from "express";
import playerService from "../services/player.service";
import { HttpStatusCode } from "../utils/httpStatusCode.util";
import { MessageResponse } from "../utils/message.ultils";
import { sendSuccess } from "../utils/response.util";
import mongoose from "mongoose";
import { IPlayer } from "../models/player.model";

class PlayerController {
    /**
     * Add a new player
     */
    async addPlayer(req: Request, res: Response, next: NextFunction) {
        try {
            const player = await playerService.addPlayer(req.body);
            sendSuccess(res, HttpStatusCode.CREATED, player as IPlayer, MessageResponse.ADD_PLAYER_SUCCESS);
        } catch (error) {
            next(error);
        }
    }

    /**
     * edit player
     */
    async updatePlayerGender(req: Request, res: Response, next: NextFunction) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: 'Invalid User' });
            }
            const player = await playerService.updatePlayerGender(req.params.id, req.body.gender);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all players
     */
    async getAllPlayers(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                search,
                page = '1',
                limit = '999',
            } = req.body as {
                search?: string;
                page?: string;
                limit?: string;
            };
            const gender = req.body.gender ?? "";
            const result = await playerService.getAllPlayers(search, page, limit, gender);
            sendSuccess(res, HttpStatusCode.OK, result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get player by ID
     */
    async getPlayerById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const player = await playerService.getPlayerById(req.params.id);
            if (!player) {
                return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Player not found' });
            }
            sendSuccess(res, HttpStatusCode.OK, player);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get history matches by player ID
     */
    async getHistoryMatchesByPlayerId(req: Request, res: Response, next: NextFunction) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const matches = await playerService.getHistoryMatchesByPlayerId(req.params.id);
            sendSuccess(res, HttpStatusCode.OK, matches);
        } catch (error) {
            next(error);
        }
    }


}

export default new PlayerController();