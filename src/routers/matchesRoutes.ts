
import express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoutes = express.Router();

// get tracking list
matchesRoutes.post('/', MatchesController.createMatch);

// get history matches
matchesRoutes.post('/history', MatchesController.getHistoryMatches);

// get pair win rate
matchesRoutes.post('/pair-win-rate', MatchesController.getPairWinRate);

export default matchesRoutes;