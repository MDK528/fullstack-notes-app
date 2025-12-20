import express, { json, urlencoded, static as static_ } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(json({ limit: '24kb' }))
app.use(urlencoded({ limit: '24kb' }))
app.use(static_("public"))
app.use(cookieParser())

// define routes
import userRoute from "../src/routes/user.routes.js";
import noteRouter from "../src/routes/note.routes.js"

app.use("/api/v1/users", userRoute)
app.use("/api/v1/notes", noteRouter)

export { app }