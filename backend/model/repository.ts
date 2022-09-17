import "dotenv/config";
import TransactionLogsModel from "./transactionLogModel";

import mongoose, { ConnectOptions } from "mongoose";

const mongoDB: string = process.env.DB_CLOUD_URI || "";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

async function _createTransactionLog(uinfin: any, scopes: any) {
  return new TransactionLogsModel({
    uinfin: uinfin,
    scopes: scopes,
  });
}

export async function createTransactionLog(uinfin: any, scopes: any) {
  const newLog = await _createTransactionLog(uinfin, scopes);
  newLog.save();
}
