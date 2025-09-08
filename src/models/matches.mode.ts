import mongoose, { Document, Schema } from 'mongoose';
export interface IMatch extends Document {
    firstPlayer: string;
    secPlayer: string;
    thirdPlayer: string;
    fourthPlayer: string;
    firstScore: number;
    secScore: number;
    winner: string[];
    matchDay: Date;
}

export interface IPairMatch {
    matchesPlayed: number;
    firstTeamPairWins: number;
    secTeamPairWins: number;
    winRateFirstTeamPair: string; // %
    winRateSecTeamPair: string; // %
}

const matchSchema: Schema = new Schema<IMatch>({
    firstPlayer: {
        type: String,
        required: true,
        trim: true,
    },
    secPlayer: {
        type: String,
        required: true,
        trim: true,
    },
    thirdPlayer: {
        type: String,
        required: true,
        trim: true,
    },
    fourthPlayer: {
        type: String,
        required: true,
        trim: true,
    },
    firstScore: {
        type: Number,
        required: true,
    },
    secScore: {
        type: Number,
        required: true,
    },
    winner: {
        type: [String],
        required: true,
    },
    matchDay: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, {
    timestamps: true,
    collection: 'matches',
})

const MatchModel = mongoose.model<IMatch>('Match', matchSchema);

export default MatchModel;