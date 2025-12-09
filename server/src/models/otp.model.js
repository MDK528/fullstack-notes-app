import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        emailId: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
        },
        otp: {
            type: Number
        },
        expiresAt: {
            type: Date
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const OTP = mongoose.model("OTP", otpSchema)