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
        <div className="">

            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam eum ipsum, sequi itaque deserunt accusamus commodi temporibus quaerat amet veritatis, debitis odit consequuntur placeat, numquam atque praesentium. Cumque debitis facere ex, expedita eos veritatis et blanditiis, natus asperiores assumenda consectetur sit hic vero! Unde, aut! Accusantium, maxime! Ipsa fugit voluptate pariatur assumenda vel nesciunt odit nemo amet rem. Temporibus architecto ullam asperiores laborum non ex, nemo ut dolore inventore quod maxime beatae enim doloremque mollitia voluptatum odit repellendus vel! Placeat nostrum odio doloribus aperiam assumenda maiores. Exercitationem, quis sint expedita quia aspernatur molestiae, cum enim maiores quod nam vitae aliquam ipsam, vero consectetur recusandae obcaecati omnis. Odit quas commodi assumenda saepe at quae eaque velit possimus minus consequatur amet omnis, debitis ducimus molestiae reprehenderit repellendus! Ut eum quam vel cupiditate blanditiis molestias obcaecati tempore magnam magni quaerat expedita beatae sit, exercitationem minima labore alias nesciunt vitae odit ab corporis inventore minus quas reiciendis. Voluptatem exercitationem illum corrupti officiis explicabo, est iure excepturi! Minima modi facere explicabo! Vero aliquid culpa nostrum sint ea, veniam dolore, adipisci repellendus voluptatum autem tempora iste impedit nemo voluptatem cupiditate consequatur! Suscipit ducimus veniam animi nemo iure dolor culpa repellendus id dolores distinctio cum a reiciendis reprehenderit odio molestiae maiores accusamus quos, illum corrupti tempora corporis voluptates sed amet! Blanditiis neque harum optio officiis eos dolore aspernatur accusantium explicabo amet. Aperiam ad exercitationem adipisci et explicabo quam voluptate aliquam fugiat repudiandae, blanditiis veritatis quae praesentium quia totam placeat minima veniam perferendis. Perspiciatis voluptatum ullam corrupti necessitatibus nemo eius ipsa adipisci, dicta iste exercitationem blanditiis reiciendis. Eligendi quia voluptate repellendus officia adipisci fugiat nihil reprehenderit optio voluptatum sapiente minima ab, nostrum architecto doloribus odit iusto vero doloremque recusandae aspernatur voluptatem totam vitae aliquam ex? Impedit unde ad inventore culpa maxime itaque pariatur quibusdam enim assumenda nihil porro consequuntur explicabo soluta quod minima, facilis nesciunt quaerat? Rem fugiat dolores, ipsum et fugit animi dolore tempore natus neque pariatur vero voluptatum ex, optio nam totam nulla, asperiores ipsam eius. Ut sapiente libero illum corrupti rem adipisci consequatur dicta eum quidem. Necessitatibus facere eum pariatur. Possimus magni, illo excepturi debitis hic iste animi ducimus molestiae, blanditiis quia eius rerum odio necessitatibus maiores libero obcaecati maxime quod molestias. Voluptas nesciunt, aspernatur, alias quo aliquam atque delectus maxime eos assumenda fugit sequi officiis possimus magni dolore omnis ad dolores beatae odit quidem! Facere aliquid ad laboriosam libero quam atque odio esse, dolorem, iste, possimus illum at aut repellendus. Architecto, id iste! Ducimus eos ipsa laboriosam necessitatibus et quam quidem nulla aut, eaque unde est aliquid eveniet reiciendis beatae dolor, hic non corporis dolorem molestias deserunt modi voluptatem! Nihil, cumque. Iure possimus libero, sunt nostrum quisquam unde culpa doloribus, tempore optio modi quasi eligendi illo hic rerum explicabo recusandae cum quod eveniet harum! Quo, odit a corrupti ea sequi ducimus dicta, in molestiae non ex tempore voluptatibus doloribus quae cum dolore est. Vel culpa quaerat sapiente explicabo sed. Inventore illo veniam, voluptates quo, vel libero eveniet cum nam quidem accusamus at! Totam, nisi.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ducimus a odit eligendi iure natus sequi expedita animi enim libero officia amet, at id molestiae officiis sint aspernatur, dolorem maiores?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga a impedit natus nulla unde repellendus omnis possimus officiis porro non eum provident, hic ipsum veniam voluptatibus aliquid, quis vel, vitae dolorum! Adipisci distinctio libero ea, sint quasi asperiores! Dolor eius eum atque alias repudiandae deserunt eos maiores itaque nobis quia quod provident accusantium sapiente beatae, omnis culpa quae porro obcaecati explicabo. In possimus quia accusamus corrupti sit sapiente atque perspiciatis expedita maxime perferendis, aut eaque vel earum provident, qui ex, dignissimos voluptatem voluptatibus eligendi illo! Voluptatibus obcaecati fuga commodi voluptatem aut eligendi et modi, earum consectetur tenetur alias? Quaerat iste ipsam similique velit beatae ipsa dignissimos cupiditate dolorem a sit, repellendus distinctio exercitationem in pariatur quibusdam quod repudiandae rem obcaecati numquam excepturi? Doloremque voluptatem temporibus, labore aliquid distinctio ab quis est facere sed deleniti qui necessitatibus ea magnam placeat ipsam vel quasi iusto repudiandae repellat ut omnis unde nemo modi. Eligendi accusantium inventore pariatur, odit quos explicabo autem quibusdam tenetur excepturi. Aliquid saepe hic cumque iure ipsam explicabo sint tempora aliquam atque aperiam culpa minus itaque praesentium laborum enim quisquam, doloribus non nisi! Nam eligendi facilis repellendus suscipit eum nesciunt nisi nihil quia consequuntur soluta delectus error voluptates quas quae totam, exercitationem esse ea dolor eos? Distinctio accusamus et similique in. Voluptate, laborum. Voluptas aliquam earum quas architecto doloribus quisquam tempore ipsam tenetur nihil? Labore aperiam debitis quae maiores voluptates sapiente reiciendis at aut aliquam deleniti soluta cupiditate fugit neque eveniet aspernatur facere a quos ipsum non, asperiores provident voluptas? Porro sed et doloremque ullam iure, iusto ipsa eveniet, provident officiis, laborum quod quis tempore libero eligendi architecto magni officia. Ipsa, dignissimos quisquam minus cum ratione debitis cumque odit ab, perspiciatis ipsum recusandae officiis aspernatur, omnis sint dolore! Culpa accusantium at consectetur porro reprehenderit aspernatur repudiandae ad magnam? Ut doloremque dignissimos, laborum minima vel et odio dolor, nesciunt sequi rem iure assumenda. Voluptatum nobis explicabo, corporis harum, consequatur dolore debitis deserunt eaque id necessitatibus dolorem libero eligendi odit. Vitae non, obcaecati, corporis itaque odio excepturi deserunt dignissimos totam reiciendis neque cupiditate fuga laboriosam, alias recusandae facere! Impedit tempore recusandae eaque quibusdam odit maiores, unde voluptates. Molestias a itaque in quod quis doloribus praesentium vitae qui perferendis optio ducimus exercitationem dignissimos, numquam rem at libero! Corporis dolorem eum omnis recusandae excepturi eos iste nesciunt quod explicabo veritatis odit fugiat fuga doloremque, porro beatae molestiae et magnam quia, minima aliquid ipsum numquam!
            </p>
            {/* <button
                    onClick={async () => {
                        await authService.logout()
                        navigate('/')
                    }}
                    className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90"
                >
                    Logout
            </button> */}
        </div>
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