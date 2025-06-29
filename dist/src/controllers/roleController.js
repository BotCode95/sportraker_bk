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
exports.getRoles = exports.createRole = void 0;
const role_1 = require("../models/role");
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol } = req.body;
    try {
        const role = new role_1.Role({ rol });
        yield role.save();
        res.json({
            msg: 'Rol Creado',
            role
        });
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
});
exports.createRole = createRole;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_1.Role.find();
    res.json({ roles });
});
exports.getRoles = getRoles;
