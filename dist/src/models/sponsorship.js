"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sponsorship = void 0;
const mongoose_1 = require("mongoose");
const SponsorshipSchema = new mongoose_1.Schema({
    player: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    amountNeeded: {
        type: Number,
        required: true,
    },
    amountCollected: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Sponsorship = (0, mongoose_1.model)('Sponsorship', SponsorshipSchema);
