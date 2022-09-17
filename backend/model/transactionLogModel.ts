import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionLogsSchema = new Schema(
  {
    uinfin: {
      type: String,
      requested: true,
    },
    scopes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TransactionLogsModel", TransactionLogsSchema);
