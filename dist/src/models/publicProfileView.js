"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicProfileView = void 0;
const mongoose_1 = require("mongoose");
const publicProfileViewSchema = new mongoose_1.Schema({
    player: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Player', required: true, unique: true },
    fullName: { type: String, required: true },
    avatarUrl: { type: String },
    disciplines: [{
            type: String,
            enum: ['tennis', 'padel'],
            required: true
        }],
    level: {
        type: String,
        enum: ['Inicial', 'Intermedio', 'Avanzado', 'Profesional']
    },
    rankingPosition: { type: Number },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});
exports.PublicProfileView = (0, mongoose_1.model)('PublicProfileView', publicProfileViewSchema);
