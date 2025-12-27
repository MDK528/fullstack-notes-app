import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authService from '@/services/auth.service'
import { toastManager } from '@/components/ui/toast'

function Profile()
{
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false) 
    const userProfile = async() =>{
        setLoading(true)
        try {
            const response = await authService.getCurrentUser()
            setUser(response.data)
        } catch (error) {
            toastManager.add({
                title: "Error",
                description: error.message,
                type: "error"
            })
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        userProfile()

    },[])
    

    return (
        <div className="md:max-w-100 bg-background mx-auto p-6">
            
            {
                loading ? <>Loading Profile....</>: (
                    <form>
                        <div className="flex flex-col gap-6">

                        <div>
                            <div className="grid gap-2 place-content-center">
                                <img 
                                    src={user === null ? '' || 'https://www.nuflowerfoods.com/wp-content/uploads/2024/09/person-dummy.jpg':user.avatar || 'https://www.nuflowerfoods.com/wp-content/uploads/2024/09/person-dummy.jpg'} 
                                    alt="img"
                                    className='border rounded-full h-25 w-25 object-cover' />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                value={user === null? '': user.fullName}
                                disabled
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={user === null ? '':user.emailId}
                                disabled
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={user === null ? '':user.userName}
                                disabled
                            />
                        </div>

                    </div>
                </form>
                )
            }
                

                 {/* <Button type="submit" className="w-full cursor-pointer text-background bg-foreground rounded-md py-1.5 mt-4">
                    Submit
                </Button>  */}
            {/* </form> */}
        </div>
    )
}

export default Profile