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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.header('x-token');
    if (!token) {
        res.json({
            msg: 'there is not token in the request'
        });
        return;
    }
    try {
        const secret = (_a = process.env.SECRETORPRIVATEKEY) !== null && _a !== void 0 ? _a : '';
        const { uid, player } = jsonwebtoken_1.default.verify(token, secret);
        const user = yield user_1.User.findById(uid);
        if (!user) {
            res.status(401).json({
                msg: 'El usuario no existe'
            });
            return;
        }
        if (!user.status) {
            res.status(401).json({
                msg: 'El usuario esta desactivado'
            });
            return;
        }
        try {
            const now = new Date();
            now.setHours(now.getHours() - 3);
            user.lastLogin = now;
            yield user.save();
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error al actualizar la fecha de inicio de sesión',
                error
            });
            return;
        }
        req.user = user;
        req.player = player;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token is not valid'
        });
        return;
    }
});
exports.validateJWT = validateJWT;
