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
exports.createTransactionLog = void 0;
require("dotenv/config");
const transactionLogModel_1 = __importDefault(require("./transactionLogModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB = process.env.DB_CLOUD_URI || "";
mongoose_1.default.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
function _createTransactionLog(uinfin, scopes) {
    return __awaiter(this, void 0, void 0, function* () {
        return new transactionLogModel_1.default({
            uinfin: uinfin,
            scopes: scopes,
        });
    });
}
function createTransactionLog(uinfin, scopes) {
    return __awaiter(this, void 0, void 0, function* () {
        const newLog = yield _createTransactionLog(uinfin, scopes);
        newLog.save();
    });
}
exports.createTransactionLog = createTransactionLog;
