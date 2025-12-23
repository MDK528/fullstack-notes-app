import React,{ useState, useEffect } from "react";
import noteService from "@/services/notes.service.js";
import Textarea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toastManager } from "@/components/ui/toast";

export default function Note(){
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteItem, setNewNoteItem] = useState('')
    const [closeTexarea, setCloseTextarea] = useState(true)

    const closeBtn = (e) => { 
        e.preventDefault()
        closeTexarea ? setCloseTextarea(false) : setCloseTextarea(true)
    }

    const addNote = async (e) => {
        e.preventDefault()
        try {
            const response = await noteService.createNote({
                noteTitle: newNoteTitle,
                noteItem: newNoteItem,
                completed: false
            })
            setNotes([...notes, response.data])
            setNewNoteTitle('')
            setNewNoteItem('')
        } catch (error) {
             toastManager.add({
                title: "Error",
                description: error.message,
                type: "error"
                })
        }

    }

    useEffect(()=>{

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
        
        fetchNotes()
    },[])

    if (loading) {
        // return (
        //     <>{
        //             toastManager.add({
        //                 title: "Loading",
        //                 description: "Loading Notes...",
        //                 type: "loading"
        //             })
        //         }
        //     </>
        // )

        return  (<div className="flex items-center justify-center w-full">
                    <div className="text-xl">Loading notes...</div>
                </div>)
    }

    return (
        <div className="min-h-screen  bg-background mt-4">
            <div className="max-w-6xl mx-auto">

                <div
                    className='sm:w-lg md:w-xl mx-auto bg-card rounded-md border border-neutral-200 dark:border-neutral-800 
                    p-2'
                >
                    <div>
                        <Textarea
                            className={`w-full overflow-hidden field-sizing-content resize-none px-2 py-1 sm:px-3 sm:py-2 outline-none text-neutral-700 text-lg sm:text-xl dark:text-neutral-300 ${closeTexarea ? 'hidden' : ''}`}
                            placeholder={'Title'}
                            onChange={(e)=>setNewNoteTitle(e.target.value)}
                            value={newNoteTitle}
                        />
                    </div>

                    <div>
                        <Textarea
                            className={'w-full overflow-hidden field-sizing-content resize-none px-2 py-1 sm:px-3 sm:py-2 outline-none text-neutral-700 text-sm sm:text-base dark:text-neutral-300'}
                            placeholder={'Take a note...'}
                            onChange={(e)=> setNewNoteItem(e.target.value)}
                            value={newNoteItem}
                        />
                    </div>

                    <div className='px-2 py-1 sm:px-3 sm:py-2 flex gap- justify-end items-center overflow-hidden'>
                        <Button
                            className={'cursor-pointer'}
                            variant='ghost'
                            onClick={closeBtn}
                        >
                            {closeTexarea ?  <ChevronDown/> : <ChevronUp/>}
                        </Button>

                        <Button
                            className={'cursor-pointer'}
                            variant="ghost"
                            disabled={closeTexarea ? true : false}
                            onClick={addNote}
                        >
                            {closeTexarea ? '' : <Plus/>}
                        </Button>
                    </div>

                </div>

                <div className="bg-card mt-4 sm:w-lg md:w-xl mx-auto">
                    {notes.length === 0 ? (
                        <p className="text-muted-foreground">
                            No notes yet. Create your first note!
                        </p>
                    ) : (
                        <div className="grid gap-4">
                            {notes.map((note) => (
                                <div 
                                    key={note._id} 
                                    className="border p-4 rounded-lg hover:bg-accent/50 "
                                >
                                    <h3 className="font-semibold text-lg">
                                        {note.noteTitle || 'Untitled Note'}
                                    </h3>
                                    <p className="text-muted-foreground mt-2">
                                        {note.noteItem}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
    
}