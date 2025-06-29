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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.getPlayerById = exports.getPlayers = exports.createPlayer = void 0;
const player_1 = require("../models/player");
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = new player_1.Player(req.body);
        yield player.save();
        res.status(201).json({
            msg: 'Player created successfully',
            player
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createPlayer = createPlayer;
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value = '', query = 'name' } = req.query;
    try {
        const regex = new RegExp(`^${value}$`, 'i');
        let filter = {};
        if (query === 'city') {
            filter = { city: regex };
        }
        else if (query === 'province') {
            filter = { province: regex };
        }
        else {
            filter = {
                $or: [{ firstName: regex }, { lastName: regex }]
            };
        }
        const players = yield player_1.Player.find(filter);
        res.json({ players });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error fetching players', error });
    }
});
exports.getPlayers = getPlayers;
const getPlayerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const player = yield player_1.Player.findById(id).populate('user');
        if (!player) {
            res.status(404).json({ msg: 'Player not found' });
            return;
        }
        res.json({ player });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getPlayerById = getPlayerById;
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, rest = __rest(_a, ["_id"]);
    try {
        const player = yield player_1.Player.findByIdAndUpdate(id, rest, { new: true });
        res.json({ player });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const player = yield player_1.Player.findByIdAndUpdate(id, { active: false }, { new: true });
        res.json({ player });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.deletePlayer = deletePlayer;
