"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TransactionLogsSchema = new Schema({
    requester_uinfin: {
        type: String,
        requested: true,
    },
    requestee_uinfin: {
        type: String,
        required: true,
    },
    scopes: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("TransactionLogsModel", TransactionLogsSchema);
