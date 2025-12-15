import { Router } from "express"
import { createNote, getNote, updateNote, deleteNote, summarizeNote } from "../controllers/note.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()


router.use(verifyJWT)
router.route("/create-note").post(upload.single("image"), createNote)
router.route("/get-note").get(upload.none(), getNote)
router.route("/update-note/:id").patch(upload.single("image"), updateNote)
router.route("/delete-note/:id").delete(upload.none(), deleteNote)
router.route("/summarize-note/:id").post(upload.none(), summarizeNote)

export default router