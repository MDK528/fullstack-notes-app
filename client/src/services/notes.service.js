import apiInstance from "./api.service";

const noteService = {
    createNote: async(noteData)=>{
        try {
            const res = await apiInstance.post("/notes/create-note", noteData)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to create note")
        }
    },
    getNotes: async()=>{
        try {
            const res = await apiInstance.get("/notes/notes")
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to fetch note")
        }
    },
    updateNote: async(id, noteData)=>{
        try {
            const res = await apiInstance.patch(`/notes/update-note/${id}`, noteData)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to update note")
        }
    },
    deleteNote: async(id)=>{
        try {
            const res = await apiInstance.delete(`/notes/delete-note/${id}`)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to delete note")
        }
    },
    summarizeNote: async(id)=>{
        try {
            const res = await apiInstance.post(`/notes/summarize-note/${id}`)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to summarize note")
        }
    },
}

export default noteService