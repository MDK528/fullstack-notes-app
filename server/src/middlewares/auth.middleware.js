import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";
configDotenv();


export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies?.accesstoken
    
        if (!token) {
            return res.status(400).json({
                "success": false,
                "message": "Unauthorized access"
            })
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id)
    
        if (!user){
            return res
                .status(400)
                .json({
                    "success": false,
                    "message": "Invalid access token" 
                })
        }
    
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "message": error?.message
        })
    }
    
})