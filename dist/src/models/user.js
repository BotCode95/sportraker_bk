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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: false, unique: true, lowercase: true },
    password: { type: String, required: false },
    dni: { type: Number, required: true },
    rol: { type: String, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    status: { type: Boolean, default: true },
    isPremium: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
});
userSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password } = _a, user = __rest(_a, ["__v", "password"]);
    return user;
};
exports.User = (0, mongoose_1.model)('User', userSchema);
