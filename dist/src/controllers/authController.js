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
exports.validateTokenUser = exports.login = void 0;
const generate_jwt_1 = require("../utils/generate-jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const player_1 = require("../models/player");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: 'Email / Passsword no es correcto'
            });
            return;
        }
        if (!user.status) {
            res.status(400).json({
                msg: 'El usuario esta desactivado'
            });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'La Contraseña es incorrecta'
            });
            return;
        }
        try {
            yield user_1.User.findOneAndUpdate({ email }, { lastLogin: new Date() }, { new: true });
        }
        catch (error) {
            res.status(500).json({
                msg: 'Error al actualizar la fecha de inicio de sesión',
                error
            });
            return;
        }
        const player = yield player_1.Player.findOne({ userId: user._id });
        const token = yield (0, generate_jwt_1.generateJWT)({ uid: user === null || user === void 0 ? void 0 : user._id.toString(), data: { player } });
        res.json({
            user,
            player,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        return;
    }
});
exports.login = login;
const validateTokenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        player: req.player,
    };
    const token = yield (0, generate_jwt_1.generateJWT)({ uid: req.user, data });
    res.json({
        user: req.user,
        token: token,
    });
});
exports.validateTokenUser = validateTokenUser;
