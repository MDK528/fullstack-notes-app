import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service.js";
import noteService from "@/services/notes.service.js";

export default function Note(){
    return (
        <h1 className="text-red-400">This is Note Component</h1>
    )
}