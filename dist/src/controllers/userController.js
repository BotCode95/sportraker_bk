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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.changePasswordByEmailUser = exports.changePasswordUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.getUsersCounts = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generate_jwt_1 = require("../utils/generate-jwt");
const player_1 = require("../models/player");
const getUsersCounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count_user = yield user_1.User.countDocuments();
        res.json(count_user);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getUsersCounts = getUsersCounts;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find();
    res.json({ users });
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.User.findById(id);
        res.json({
            user
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id } = _a, resto = __rest(_a, ["_id"]);
    try {
        const user = yield user_1.User.findByIdAndUpdate(id, resto, { new: true });
        res.json({ user });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.User.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({ user });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.deleteUser = deleteUser;
const changePasswordUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const { password } = req.body;
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        const passwordUpdated = bcryptjs_1.default.hashSync(password, salt);
        const userUpdated = yield user_1.User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { password: passwordUpdated }, { new: true });
        res.json({ userUpdated });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.changePasswordUser = changePasswordUser;
const changePasswordByEmailUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        const passwordUpdated = bcryptjs_1.default.hashSync(password, salt);
        const userFinded = yield user_1.User.findOne({ email });
        if (!userFinded) {
            res.status(400).json({ msg: 'El usuario no existe, validar email' });
        }
        const userUpdated = yield user_1.User.findByIdAndUpdate(userFinded === null || userFinded === void 0 ? void 0 : userFinded._id, { password: passwordUpdated }, { new: true });
        res.json({ userUpdated });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.changePasswordByEmailUser = changePasswordByEmailUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, dni, rol, status, isPremium } = req.body;
    try {
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
            return;
        }
        const user = new user_1.User({ name, lastname, email, dni, password, rol, status, isPremium });
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        user.name = user.name.trimEnd();
        user.lastname = user.lastname.trimEnd();
        yield user.save();
        const player = new player_1.Player({
            userId: user._id,
            firstName: name.trimEnd(),
            lastName: lastname.trimEnd(),
        });
        yield player.save();
        const token = yield (0, generate_jwt_1.generateJWT)({ uid: user.id });
        res.json({
            msg: 'Usuario creado correctamente',
            user,
            player,
            token
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createUser = createUser;
