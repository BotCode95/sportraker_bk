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
exports.updateMatch = exports.getMatchById = exports.getMatches = exports.createMatch = void 0;
const match_1 = require("../models/match");
const createMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = new match_1.Match(req.body);
        yield match.save();
        res.status(201).json(match);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error creating match', error });
    }
});
exports.createMatch = createMatch;
const getMatches = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matches = yield match_1.Match.find();
        res.json(matches);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error retrieving matches', error });
    }
});
exports.getMatches = getMatches;
const getMatchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_1.Match.findById(req.params.id);
        if (!match) {
            res.status(404).json({ msg: 'Match not found' });
            return;
        }
        res.json(match);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error retrieving match', error });
    }
});
exports.getMatchById = getMatchById;
const updateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const match = yield match_1.Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!match) {
            res.status(404).json({ msg: 'Match not found' });
            return;
        }
        res.json(match);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error updating match', error });
    }
});
exports.updateMatch = updateMatch;
