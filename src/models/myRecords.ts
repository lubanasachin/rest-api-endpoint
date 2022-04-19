import mongoose from "mongoose";

import { MyRecord } from "../types";

export type MyRecordDocument = mongoose.Document & MyRecord;

const myRecordSchema = new mongoose.Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],
}, { timestamps: true });

export const MyRecords = mongoose.model<MyRecordDocument>("Records", myRecordSchema);