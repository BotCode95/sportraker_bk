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
exports.updateStats = exports.getStatsByPlayer = exports.createPlayerStats = void 0;
const stats_1 = require("../models/stats");
const createPlayerStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = new stats_1.PlayerStats(req.body);
        yield stats.save();
        res.status(201).json({ msg: 'Stats created', stats });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createPlayerStats = createPlayerStats;
const getStatsByPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId } = req.params;
    try {
        const stats = yield stats_1.PlayerStats.findOne({ player: playerId });
        if (!stats) {
            res.status(404).json({ msg: 'Stats not found' });
            return;
        }
        res.json({ stats });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getStatsByPlayer = getStatsByPlayer;
const updateStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerId } = req.params;
    try {
        const stats = yield stats_1.PlayerStats.findOneAndUpdate({ player: playerId }, req.body, { new: true });
        res.json({ stats });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.updateStats = updateStats;
