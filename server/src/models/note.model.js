import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
    {
        noteTitle: {
            type: String,
            trim: true
        },
        noteItem: {
            type: String,
            trim: true,
        },
        completed: {
            type: Boolean,
        },
        image: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
)

export const Note = mongoose.model("Note", noteSchema)