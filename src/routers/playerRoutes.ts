
import express from 'express';
import playersController from '../controllers/players.controller';

const playersRoutes = express.Router();
// add player
playersRoutes.post('/', playersController.addPlayer);

// get all players
playersRoutes.post('/list', playersController.getAllPlayers);

// get player by id
playersRoutes.get('/:id', playersController.getPlayerById);

// get history matches by player ID
playersRoutes.get('/:id/history', playersController.getHistoryMatchesByPlayerId);

// edit player
playersRoutes.post('/:id', playersController.updatePlayerGender);



export default playersRoutes;