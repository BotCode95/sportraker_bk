"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdatePublicProfile = exports.getPublicProfileByPlayer = void 0;
const publicProfileView_1 = require("../models/publicProfileView");
const getPublicProfileByPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId } = req.params;
    try {
        const profile = yield publicProfileView_1.PublicProfileView.findOne({ player: playerId })
            .populate('player')
            .populate('statsPreview');
        if (!profile) {
            res.status(404).json({ msg: 'Public profile not found' });
            return;
        }
        res.json({ profile });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getPublicProfileByPlayer = getPublicProfileByPlayer;
const createOrUpdatePublicProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player } = req.body;
    try {
        const existing = yield publicProfileView_1.PublicProfileView.findOne({ player });
        if (existing) {
            const updated = yield publicProfileView_1.PublicProfileView.findOneAndUpdate({ player }, req.body, { new: true });
            res.json({ msg: 'Profile updated', profile: updated });
            return;
        }
        const profile = new publicProfileView_1.PublicProfileView(req.body);
        yield profile.save();
        res.status(201).json({ msg: 'Public profile created', profile });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createOrUpdatePublicProfile = createOrUpdatePublicProfile;
