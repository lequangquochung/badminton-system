
import express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoutes = express.Router();

// get tracking list
matchesRoutes.post('/', MatchesController.createMatch);

// get history matches
matchesRoutes.get('/history', MatchesController.getHistoryMatches);

// get pair win rate
matchesRoutes.get('/pair-win-rate', MatchesController.getPairWinRate);

export default matchesRoutes;