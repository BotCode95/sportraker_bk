"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const publicProfileController_1 = require("../controllers/publicProfileController");
const router = (0, express_1.Router)();
router.post('/', [validate_jwt_1.validateJWT], publicProfileController_1.createOrUpdatePublicProfile);
router.get('/:playerId', publicProfileController_1.getPublicProfileByPlayer);
exports.default = router;
