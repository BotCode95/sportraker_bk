"use strict";
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
exports.Player = void 0;
const mongoose_1 = require("mongoose");
const playerSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String },
    province: { type: String },
    birthDate: { type: Date },
    gender: { type: String, enum: ['masculino', 'femenino', 'otro'] },
    avatarUrl: { type: String },
    disciplines: [{ type: String, enum: ['tenis', 'padel'] }],
    technicalSkills: {
        power: { type: Number, min: 0, max: 10 },
        endurance: { type: Number, min: 0, max: 10 },
        technique: { type: Number, min: 0, max: 10 }
    }
}, {
    timestamps: true
});
playerSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password } = _a, player = __rest(_a, ["__v", "password"]);
    return player;
};
exports.Player = (0, mongoose_1.model)('Player', playerSchema);
