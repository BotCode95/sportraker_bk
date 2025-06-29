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
exports.updateSponsor = exports.getSponsorById = exports.getSponsorRequests = exports.createSponsorRequest = void 0;
const sponsorship_1 = require("../models/sponsorship");
const createSponsorRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sponsor = new sponsorship_1.Sponsorship(req.body);
        yield sponsor.save();
        res.status(201).json(sponsor);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error creating sponsor request', error });
    }
});
exports.createSponsorRequest = createSponsorRequest;
const getSponsorRequests = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sponsors = yield sponsorship_1.Sponsorship.find();
        res.json(sponsors);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error retrieving sponsor requests', error });
    }
});
exports.getSponsorRequests = getSponsorRequests;
const getSponsorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sponsor = yield sponsorship_1.Sponsorship.findById(req.params.id);
        if (!sponsor) {
            res.status(404).json({ msg: 'Sponsor request not found' });
            return;
        }
        res.json(sponsor);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error retrieving sponsor request', error });
    }
});
exports.getSponsorById = getSponsorById;
const updateSponsor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sponsor = yield sponsorship_1.Sponsorship.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sponsor) {
            res.status(404).json({ msg: 'Sponsor request not found' });
            return;
        }
        res.json(sponsor);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error updating sponsor request', error });
    }
});
exports.updateSponsor = updateSponsor;
