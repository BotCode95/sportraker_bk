"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validators_1 = require("../utils/validators");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', [validate_jwt_1.validateJWT], userController_1.getUsers);
router.get('/count', userController_1.getUsersCounts);
router.get('/:id', userController_1.getUserById);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es requerido').not().isEmpty(),
    (0, express_validator_1.check)('lastname', 'El apellido es requerido').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe contener al menos 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El email no es valido').isEmail(),
    (0, express_validator_1.check)('rol').custom(validators_1.isRoleValidate),
], userController_1.createUser);
router.post('/change-password', [validate_jwt_1.validateJWT], userController_1.changePasswordUser);
router.post('/change-password-by_email', userController_1.changePasswordByEmailUser);
router.put('/:id', [
    (0, express_validator_1.check)('rol').custom(validators_1.isRoleValidate),
], userController_1.updateUser);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
], userController_1.deleteUser);
exports.default = router;
