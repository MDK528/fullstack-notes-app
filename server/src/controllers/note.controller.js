import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "../models/note.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { GoogleGenAI } from "@google/genai"
import { User } from "../models/user.model.js";

const createNote = asyncHandler(async(req, res)=>{
    const {noteTitle, noteItem, completed, image} = req.body

    if (!noteItem || noteItem === "") {
        return res
                .status(400)
                .json({
                    "success": false,
                    "message": "Fill your note first"
                })
    }

    const localImagePath = req.file?.path
    
    const response = await uploadOnCloudinary(localImagePath)

    const note = await Note.create({
        noteTitle: noteTitle || "",
        noteItem: noteItem,
        completed: completed || false,
        image: response?.url || "",
        user: req.user._id
    })

    return res
            .status(201)
            .json({
                "success": true,
                "message": "Your note is created successfully",
                "data": note
            })
})

const getNotes = asyncHandler(async(req, res)=>{
    const notes = await Note.find({user: req.user._id})
    // console.log(req.user._id);
    
    if (notes.length === 0) {
        return res
            .status(404)
            .json({
                "success": false,
                "message": "No Notes found",
            })
    }

    return res
            .status(200)
            .json({
                "success": true,
                "message": "Your note fetched successfully",
                "data": notes
            })
})

const updateNote = asyncHandler(async(req, res)=>{
    const {noteTitle, noteItem, completed, image} = req.body
    
    const imageLocalPath = req.file?.path

    const response = await uploadOnCloudinary(imageLocalPath)

    const updatedNote = await Note.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id
        },
        {
            $set: {
                noteTitle,
                noteItem,
                completed,
                image: response?.url || ""
            }
        },
        {
            new: true
        }
    )

    console.log(updatedNote)

    if (!updatedNote) {
        return res
                .status(404)
                .json({
                    "success": false,
                    "message": "No note found or unauthorized access",
                })
    }

    return res
            .status(200)
            .json({
                "success": true,
                "message": "Your note updated successfully",
                "data": updatedNote
            })
})

const deleteNote = asyncHandler(async(req, res)=>{

    const deletedNote = await Note.findOneAndDelete(
        {
            _id: req.params.id,
            user: req.user._id
        }
    )

    if (!deletedNote) {
        return res
            .status(404)
            .json({
                "success": false,
                "message": "No notes found or unauthorized access",
                "data": deletedNote
            })
    }


    return res
            .status(200)
            .json({
                "success": true,
                "message": "Your note deleted successfully",
                "data": {}
            })
})

const summarizeNote = asyncHandler(async(req, res)=>{
    const note = await Note.findOne({
        _id:req.params.id,
        user:req.user._id
    })

    const user = await User.findById(req.user._id)
    // console.log(req.user._id);
    // console.log(user);

    if (!note) {
        return res.status(404).json({
            "success": false,
            "message": "No note found",
        })
    }

    const genAi = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY        
    })

    let response;
    try {

        if (note.noteItem.length < 50) {
            return res.status(400).json({
                "message": "Note is too short"
            })
        }

        if (note.noteItem.length > 3000) {
            return res.status(400).json({
                "message": "Note is too long"
            })
        }
        response = await genAi.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: `You are a assistant to summarize the note of a user. Always reply to user with name like, Hello ${user.fullName}` 
            },
            contents: `Summarize the note in simple words with 1-2 sentences,
            Note Title: ${note.noteTitle}
            Note Body: ${note.noteItem}
            `,
        })
        // store the res and notetitle in aiHistory doc
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Gemini failed" });
    }


    return res.status(200).json({
        "success": true,
        "message": "Note Summarized Successfull",
        "data": response.text
    })
})

export {createNote, getNotes, updateNote, deleteNote, summarizeNote}