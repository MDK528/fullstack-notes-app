import mongoose, { Schema } from "mongoose";

const aiHistorySchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        noteId: {
            type: mongoose.Types.ObjectId,
            ref: "Note",
            required: true
        },
        inputText: {
            type: String,
            required: true,
        },
        summaryText: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            default: "gemini-2.5-flash"
        }

    },
    {timestamps: true}
)

export const Histoy = mongoose.model("History", aiHistorySchema)