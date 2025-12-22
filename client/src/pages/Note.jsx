import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service.js";
import noteService from "@/services/notes.service.js";

export default function Note(){
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        console.log("Note Component Mounted")

        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser()
                // console.log("This is fetched User Data: ", userData)
                setUser(userData.data) 
                // console.log("This is User State(try): ", user)
            } catch (error) {
                console.log("Something went wrong while fetching user: ", error)
                // console.log("This is User State(catch): ", user)
            }
        }

        const fetchNotes = async () => {
            try {
                const notesData = await noteService.getNotes()
                // console.log("This is fetched Notes Data: ", notesData)
                setNotes(notesData.data)
                // console.log("This is Notes State(try): ", notes)
            } catch (error) {
                console.log("Something went wrong while fetching notes: ", error)
                // console.log("This is Notes State(catch): ", notes)
            } finally {
                setLoading(false)
            }
        }
        
        fetchUser()
        fetchNotes()
    },[])

    if (loading) {
        return  (<div className="flex items-center justify-center w-full">
                    <div className="text-xl">Loading notes...</div>
                </div>)

        // return null
    }
    return (
        <>
            Hey Khalid
            <button
                    onClick={async () => {
                        await authService.logout()
                        navigate('/')
                    }}
                    className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90"
                >
                    Logout
                </button>
        </>
        // <div className="min-h-screen bg-background p-8">
        //     <div className="max-w-6xl mx-auto">
        //         <h1 className="text-4xl font-bold mb-4">
        //             Hey {user?.fullName || 'User'}! 👋
        //         </h1>
                
        //         <div className="bg-card p-6 rounded-lg border mb-6">
        //             <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
                    
        //             {notes.length === 0 ? (
        //                 <p className="text-muted-foreground">
        //                     No notes yet. Create your first note!
        //                 </p>
        //             ) : (
        //                 <div className="grid gap-4">
        //                     {notes.map((note) => (
        //                         <div 
        //                             key={note._id} 
        //                             className="border p-4 rounded-lg hover:bg-accent/50 transition"
        //                         >
        //                             <h3 className="font-semibold text-lg">
        //                                 {note.noteTitle || 'Untitled Note'}
        //                             </h3>
        //                             <p className="text-muted-foreground mt-2">
        //                                 {note.noteItem}
        //                             </p>
        //                         </div>
        //                     ))}
        //                 </div>
        //             )}
        //         </div>

        //         <button
        //             onClick={async () => {
        //                 await authService.logout()
        //                 navigate('/')
        //             }}
        //             className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90"
        //         >
        //             Logout
        //         </button>
        //     </div>
        // </div>
    )
    
}