"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const playerStatsController_1 = require("../controllers/playerStatsController");
const router = (0, express_1.Router)();
router.post('/', [validate_jwt_1.validateJWT], playerStatsController_1.createPlayerStats);
router.get('/:id', playerStatsController_1.getStatsByPlayer);
router.put('/:id', [validate_jwt_1.validateJWT], playerStatsController_1.updateStats);
exports.default = router;
