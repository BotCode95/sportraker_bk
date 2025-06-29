"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roleController_1 = require("../controllers/roleController");
const router = (0, express_1.Router)();
router.get('/', roleController_1.getRoles);
router.post('/', roleController_1.createRole);
exports.default = router;
