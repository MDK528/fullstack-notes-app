import { Router } from "express";
import { registerUser, loginUser, logoutUser, verifyUserWithOTP, fetchCurrentUser, changeCurrentPassword, updateUserProfile } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { validate } from "../middlewares/validation.middleware.js"
import { registerSchema } from "../schemas/register.schema.js"
import { loginSchema } from "../schemas/login.schema.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.single("avatar"),
    validate(registerSchema),
    registerUser
)

router.route("/verify-otp").post(
    upload.none(),
    verifyUserWithOTP
)

router.route("/login").post(
    upload.none(),
    validate(loginSchema),
    loginUser
)

// secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, fetchCurrentUser)
router.route("/change-password").patch(upload.none(),verifyJWT, changeCurrentPassword) // it will deselect
router.route("/update-profile").patch(
    upload.single("avatar"), 
    verifyJWT, 
    updateUserProfile
)

export default router  