
import express from 'express';
import playersController from '../controllers/players.controller';

const playersRoutes = express.Router();
// add player
playersRoutes.post('/', playersController.addPlayer);

// get all players
playersRoutes.get('/', playersController.getAllPlayers);

// get player by id
playersRoutes.get('/:id', playersController.getPlayerById);

// get history matches by player ID
playersRoutes.get('/:id/history', playersController.getHistoryMatchesByPlayerId);



export default playersRoutes;