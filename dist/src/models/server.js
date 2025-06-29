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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../routes/auth"));
const user_1 = __importDefault(require("../routes/user"));
const player_1 = __importDefault(require("../routes/player"));
const publicProfile_1 = __importDefault(require("../routes/publicProfile"));
const stats_1 = __importDefault(require("../routes/stats"));
const tournament_1 = __importDefault(require("../routes/tournament"));
const sponsorShip_1 = __importDefault(require("../routes/sponsorShip"));
const match_1 = __importDefault(require("../routes/match"));
const config_1 = require("../database/config");
class Server {
    // corsOptions = {
    // 	origin: ['http://localhost:5173', 'http://192.168.0.103:5173'], // Permitir solo este origen
    // 	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    // 	allowedHeaders: ['Content-Type', 'x-token', 'Authorization'], // Encabezados permitidos
    // }
    constructor() {
        this.pathBase = '/api';
        this.path = {
            auth: `${this.pathBase}/auth`,
            users: `${this.pathBase}/user`,
            player: `${this.pathBase}/player`,
            stats: `${this.pathBase}/stats`,
            tournament: `${this.pathBase}/tournament`,
            publicProfile: `${this.pathBase}/public-profile`,
            match: `${this.pathBase}/match`,
            sponsorship: `${this.pathBase}/sponsorship`,
        };
        this.app = (0, express_1.default)();
        this.port = process.env.NODE_ENV === 'dev' ? process.env.PORT_DEVELOPMENT : process.env.PORT;
        this.connectionDB();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        // this.app.options('*', cors(this.corsOptions))
    }
    connectionDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    routes() {
        this.app.use(this.path.auth, auth_1.default);
        this.app.use(this.path.users, user_1.default);
        this.app.use(this.path.player, player_1.default);
        this.app.use(this.path.publicProfile, publicProfile_1.default);
        this.app.use(this.path.stats, stats_1.default);
        this.app.use(this.path.tournament, tournament_1.default);
        this.app.use(this.path.match, match_1.default);
        this.app.use(this.path.sponsorship, sponsorShip_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run in ${this.port}`);
        });
    }
}
exports.Server = Server;
