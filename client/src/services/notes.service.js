import apiInstance from "./api.service";

const noteService = {
    createNote: async(noteData)=>{
        try {
            const res = await apiInstance.post("/create-note", noteData)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to create note")
        }
    },
    getNotes: async()=>{
        try {
            const res = await apiInstance.get("/notes")
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to fetch note")
        }
    },
    updateNote: async(id, noteData)=>{
        try {
            const res = await apiInstance.patch(`/update-note/${id}`, noteData)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to update note")
        }
    },
    deleteNote: async(id)=>{
        try {
            const res = await apiInstance.delete(`/delete-note/${id}`)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to delete note")
        }
    },
    summarizeNote: async(id)=>{
        try {
            const res = await apiInstance.post(`/summarize-note/${id}`)
            return res.data
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to summarize note")
        }
    },
}

export default noteService