"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const mongoose_1 = require("mongoose");
const MatchSchema = new mongoose_1.Schema({
    tournament: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    playerOne: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    playerTwo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String
    },
    result: {
        winner: {
            type: mongoose_1.Types.ObjectId,
            ref: 'Player'
        },
        score: {
            type: String
        }
    },
    status: {
        type: String,
        enum: ['POR JUGAR', 'FINALIZADO', 'SUSPENDIDO', 'CANCELADO'],
        default: 'POR JUGAR'
    }
}, {
    timestamps: true
});
exports.Match = (0, mongoose_1.model)('Match', MatchSchema);
