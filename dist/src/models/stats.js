"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStats = void 0;
const mongoose_1 = require("mongoose");
const playerStatsSchema = new mongoose_1.Schema({
    playerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Player', required: true, unique: true },
    totalMatches: { type: Number, default: 0 },
    matchesWon: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, {
    timestamps: true
});
exports.PlayerStats = (0, mongoose_1.model)('PlayerStats', playerStatsSchema);
