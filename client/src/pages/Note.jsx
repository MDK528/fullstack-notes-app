import React,{ useState, useEffect } from "react";
import noteService from "@/services/notes.service.js";
import Textarea from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { toastManager } from "@/components/ui/toast";

export default function Note(){
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteItem, setNewNoteItem] = useState('')
    const [closeTexarea, setCloseTextarea] = useState(true)
    const [editingId, setEditingId] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editItem, setEditItem] = useState('')

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
        setCloseTextarea(true)
    }

    useEffect(()=>{

        const fetchNotes = async () => {
            try {
                const notesData = await noteService.getNotes()
                setNotes(notesData.data)
            } catch (error) {
                // console.log("Something went wrong while fetching notes: ", error)
                toastManager.add({
                    title: "Info",
                    description: error.message,
                    type: "info"
                })
            } finally {
                setLoading(false)
            }
        }
        
        fetchNotes()
    },[])

    const startEditNote = (note) =>{
        if (editingId === note._id) {
            setEditingId(null);
            setEditTitle('')
            setEditItem('')
         } 
         else {
            setEditingId(note._id);
            setEditTitle(note.newNoteTitle)
            setEditItem(note.newNoteItem)
        }

    }

    const saveNote = async (noteId) => {
        try {
            const response = await noteService.updateNote(noteId, {
                noteTitle: editTitle,
                noteItem: editItem
            })

            setNotes(notes.map(note=> note._id === noteId ? response.data : note))
            setEditingId(null)
            setEditTitle('')
            setEditItem('')

            toastManager.add({
                    title: "Success",
                    description: response.message,
                    type: "success"
                })

        } catch (error) {
            toastManager.add({
                    title: "Error",
                    description: error.message,
                    type: "error"
                })
        }
    }

    const deleteNote = async(noteId) =>{
        try {
            const response = await noteService.deleteNote(noteId)
            setNotes(notes.filter(note=> note._id !== noteId))
            toastManager.add({
                    title: "Success",
                    description: response.message,
                    type: "success"
                })
        } catch (error) {
             toastManager.add({
                    title: "Error",
                    description: error.message,
                    type: "error"
                })
        }
    }

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
        <div className="md:max-w-160 bg-background mx-auto">
                <div
                    className='bg-card rounded-md border border-neutral-200 dark:border-neutral-800 
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

                <div className="mt-4">
                    {notes.length === 0 ? (
                        <p className="text-muted-foreground text-center">
                            No notes yet. Create your first note!
                        </p>
                    ) : (
                        <div className="grid gap-1">
                        
                            {notes.map((note) => {
                                const isEditing = editingId === note._id
                                
                                return (
                                    <div
                                        className='bg-card rounded-md border border-gray-300 dark:border-neutral-800 p-2 my-2'
                                        key={note._id}
                                    >
                                        <div>
                                            <Textarea
                                                className={'w-full overflow-hidden field-sizing-content resize-none px-2 py-1 sm:px-3 sm:py-2 outline-none text-neutral-700 text-lg sm:text-xl dark:text-neutral-300'}
                                                value={isEditing ? editTitle : note.noteTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>

                                        <div>
                                            <Textarea
                                                className={'w-full overflow-hidden field-sizing-content resize-none px-2 py-1 sm:px-3 sm:py-2 outline-none text-neutral-700 text-sm sm:text-base dark:text-neutral-300'}
                                                value={isEditing ? editItem : note.noteItem}
                                                onChange={(e) => setEditItem(e.target.value)}
                                                readOnly={!isEditing}
                                            />
                                        </div>

                                        <div className='flex gap-5 px-2 py-1 sm:px-3 sm:py-2 justify-end items-center overflow-hidden'>
                                            <Button 
                                                variant='ghost'
                                                className={'cursor-pointer'}
                                                onClick={() => {
                                                    if (isEditing) {
                                                        saveNote(note._id)
                                                    } else {
                                                        startEditNote(note)
                                                    }
                                                }}
                                            >
                                                {isEditing ? <Save height={16} width={16}/> : <Pencil height={16} width={16}/>}
                                            </Button>

                                            <Button 
                                                variant='ghost'
                                                className={'cursor-pointer'}
                                                onClick={() => deleteNote(note._id)}
                                            >
                                                {!isEditing && <Trash2 height={16} width={16}/>}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                    )}
                </div>
        </div>
    )
    
}