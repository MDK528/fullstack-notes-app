import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { sendOTPmail } from "../utils/sendOtpMail.js"
import { OTP } from "../models/otp.model.js"

const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
}

const generateAccessTokenAndRefreshToken = async (userId)=>{
    try {
        const user = await User.findById(userId)
        // genearte tokens
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()
    
        // save generated refresh token into db
        user.refreshToken = refreshtoken
        await user.save({validateBeforeSave: false})
    
        return {accesstoken, refreshtoken}
    } catch (error) {
        throw new Error("Token generatuin failed: ",error.message)
    }
}

const registerUser = asyncHandler(async(req, res)=>{
    const {fullName, emailId, userName, password} = req.body

    const existedUser = await User.findOne({
        $or: [{emailId}, {userName}] 
    })
    
    if (existedUser) {
        return res
                .status(409)
                .json({
                    "success": false,
                    "message": "User already exists with this email or username"
                });
    }

    const avatarLocalPath = req.file?.path
    
    const response = await uploadOnCloudinary(avatarLocalPath)

    const user = await User.create({
        fullName,
        emailId,
        userName,
        password,
        avatar: response?.url || "",
        isVerified: false,
    })

    const createdUser = await User.findById(user._id).select("-password")

    const generatedOTP = Math.floor(100000+(Math.random()*900000))

    sendOTPmail(user.emailId, generatedOTP)
    .then(()=>{
        console.log(`Your OTP generated successfully`)
    })
    .catch((err)=>{
        console.log(err?.message || "Something went wrong while genrating OTP")
    })

    await OTP.create({
        emailId: emailId,
        otp: generatedOTP,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        owner: user._id
    })

    return res
            .status(201)
            .json({
                "success": true,
                "message": "User Register successfully",
                "data": createdUser
            })
})

const verifyUserWithOTP = asyncHandler(async(req, res)=>{
    const {otp} = req.body

    if (!otp) {
        return res.status(404).json({
            "success": false,
            "message": "Please enter your otp"
        })
    }

    const dbOTP = await OTP.findOne({otp})
  
    if (!dbOTP) {
        return res.status(400).json({
            "success": false,
            "message": "Please enter valid otp"
        })
    }

    if (new Date() > dbOTP.expiresAt) {
        return res.status(400).json({
            "success": false,
            "message": "Your OTP expired"
        })
    }

    const user = await User.findByIdAndUpdate(
        dbOTP.owner,
        {
            $set: {
                isVerified: true
            }
        },
        {
            new: true
        }
    )

    // must delete otp doc after verification

    const {accesstoken, refreshtoken} = await generateAccessTokenAndRefreshToken(user._id)

    return res
            .status(200)
            .cookie("accesstoken", accesstoken, options)
            .cookie("refreshtoken", refreshtoken, options)
            .json({
                "success": true,
                "message": "Your OTP verification successfull"
            })

})

const loginUser = asyncHandler(async(req, res)=>{
    const {userName, password} = req.body

    const isUserExist = await User.findOne({userName})

    if (!isUserExist) {
        return res.status(404).json({
            "success": false,
            "message": "User not found"
        })
    }

    const isValidPassword = await isUserExist.isPasswordValid(password)

    if (!isValidPassword) {
        return res.status(400).json({
            "success": false,
            "message": "Invalid Password"
        })
    }

    const user = await User.findById(isUserExist._id).select("-password")
    
    if (user.isVerified === false) {
        return res
        .status(403)
        .json({
            "success": false,
            "message": "Please verify your account first"
        })
    }

    const {accesstoken, refreshtoken} = await generateAccessTokenAndRefreshToken(isUserExist._id)

    return res
            .status(200)
            .cookie("accesstoken", accesstoken, options)
            .cookie("refreshtoken", refreshtoken, options)
            .json({
                "success": true,
                "message": "User login successfully",
                "data": user
            })
})

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
            .status(200)
            .clearCookie("refreshtoken", options)
            .clearCookie("accesstoken", options)
            .json({
                "success": true,
                "message": "User logged out successfully",
                "data": {}
            })
})

const fetchCurrentUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id).select("-password -refreshToken")

    if (!user) {
        return res.status(401).json({
            "success": false,
            "message": "Failed to fetch user"
        })
    }

    return res.status(200).json({
        "success": true,
        "message": "User account fetched successfully",
        "data": user
    })
    
})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user._id)

    if (!oldPassword || !newPassword) {
        return res.status(404).json({
            "success": false,
            "message": "Please enter your password"
        })
    }

    const userOldPassword = await user.isPasswordValid(oldPassword)

    if (!userOldPassword) {
        return res.status(400).json({
            "success": false,
            "message": "Entered old password is invalid"
        })
    }

    user.password = newPassword
    user.save({validateBeforeSave: false})

    return res.status(200).json({
            "success": true,
            "message": "Your Password changed successfully"
        })
})

const updateUserProfile = asyncHandler(async(req, res)=>{
    const {fullName, password, avatar} = req.body

    const user = await User.findById(req.user._id)

    const avatarLocalPath = req.file?.path

    const response = await uploadOnCloudinary(avatarLocalPath)

    user.fullName = fullName || user.fullName
    user.password = password || user.password
    user.avatar = response?.url || ""

    await user.save({validateBeforeSave: false})

    return res.status(200).json({
        "success": true,
        "message": "Your profile updated successfully",
        "data": user // test purpose
    })

})

// const forgotPassword = asyncHandler(async(req, res)=>{
//     const {emailId} = req.body

// })

export { registerUser, verifyUserWithOTP, loginUser, logoutUser, fetchCurrentUser, changeCurrentPassword, updateUserProfile }