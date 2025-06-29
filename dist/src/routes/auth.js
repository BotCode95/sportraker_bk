"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get('/', [validate_jwt_1.validateJWT], authController_1.validateTokenUser);
router.post('/login', [
    (0, express_validator_1.check)('email', 'the email address is required').isEmail(),
    (0, express_validator_1.check)('password', 'the password is required').not().isEmpty(),
], authController_1.login);
exports.default = router;
