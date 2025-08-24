import mongoose, { Document, Schema } from "mongoose";
import { IMatch } from "./matches.mode";

export interface IPlayer extends Document {
    name: string;
    winRate: number;
    score: number;
    matchesPlayed: number;
    matchesWon: number;
    matchesLost: number;
    partnerInfo?: IPartnerInfo[];
}

export interface IPartnerInfo extends Document {
    name: string;
    winRate: number;
}

export interface IPlayerHistory extends IMatch {
    playerId: mongoose.Types.ObjectId;
}

const playerSchema = new Schema<IPlayer>({
    name: { type: String, required: true, trim: true, unique: true },
    winRate: { type: Number, required: true, min: 0, max: 100 },
    score: { type: Number, required: true, default: 0 },
    matchesPlayed: { type: Number, required: true, default: 0 },
    matchesWon: { type: Number, required: true, default: 0 },
    matchesLost: { type: Number, required: true, default: 0 },
    partnerInfo: [{
        name: { type: String, required: false, trim: true },
        winRate: { type: Number, required: false, min: 0, max: 100 }
    }]

}, {
    timestamps: true,
    collection: 'player',
});
const PlayerModel = mongoose.model<IPlayer>('Player', playerSchema);

export default PlayerModel;