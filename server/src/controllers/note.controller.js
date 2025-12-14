import { asyncHandler } from "../utils/asyncHandler.js";
import { Note } from "../models/note.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createNote = asyncHandler(async(req, res)=>{
    const {noteTitle, noteItem, completed, image} = req.body

    if (!noteItem || noteItem === "") {
        return res
                .status(401)
                .json({
                    "success": false,
                    "error": "Fill your note body first"
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

const getNote = asyncHandler(async(req, res)=>{
    const notes = await Note.find({user: req.user._id})
    // console.log(req.user._id);
    
    if (notes.length === 0) {
        return res
            .status(404)
            .json({
                "success": false,
                "error": "No Notes found",
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
                    "error": "No note found or unauthorized access",
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

export {createNote, getNote, updateNote, deleteNote}