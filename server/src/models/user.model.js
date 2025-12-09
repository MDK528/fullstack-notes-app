import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        emailId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        avatar: {
            type: String,
            // required: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        isVerified: {
            type: Boolean,
        },
        refreshToken: {
            type: String
        },
    },
    { timestamps: true }
)
// hashing the password before save or update at db
userSchema.pre("save", async function ()
{
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
    // next()
})

// comparing the passsword from db while logging in
userSchema.methods.isPasswordValid = async function (password)
{
    return await bcrypt.compare(password, this.password)
}

// jwt auth set up
userSchema.methods.generateAccessToken = function ()
{
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function ()
{
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)