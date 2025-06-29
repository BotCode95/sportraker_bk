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
exports.updateTournament = exports.getTournamentById = exports.getTournaments = exports.createTournament = void 0;
const tournament_1 = require("../models/tournament");
const createTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournament = new tournament_1.Tournament(req.body);
        yield tournament.save();
        res.status(201).json({ msg: 'Tournament created', tournament });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createTournament = createTournament;
const getTournaments = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tournaments = yield tournament_1.Tournament.find();
        res.json({ tournaments });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getTournaments = getTournaments;
const getTournamentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tournament = yield tournament_1.Tournament.findById(id);
        if (!tournament) {
            res.status(404).json({ msg: 'Tournament not found' });
            return;
        }
        res.json({ tournament });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getTournamentById = getTournamentById;
const updateTournament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updated = yield tournament_1.Tournament.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ tournament: updated });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.updateTournament = updateTournament;
