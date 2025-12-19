import React from 'react'
import { Button } from '@/components/ui/button'
import {Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog.jsx'
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { ShimmerButton } from "@/components/ui/shimmer-button.jsx"

// try to signin

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '@/services/auth.service.js'

function SignIn()
{

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        setError('')
        setLoading(true)

        try {
            await authService.login(formData)
            navigate('/notes')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog>

                    <DialogTrigger asChild>
                        <ShimmerButton 
                        type="button"
                        className="shadow-2xl">
                            <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg dark:from-white dark:to-slate-900/10">
                                Sign In
                            </span>
                        </ShimmerButton>
                    </DialogTrigger>

                    <DialogContent className='bg-foreground border-neutral-700 text-neutral-100 sm:max-w-97'>
                        <DialogHeader>
                            <DialogTitle>Sign In</DialogTitle>
                            <DialogDescription>
                                    Enter your credentials to access your account.
                            </DialogDescription>
                            {/* {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {error}
                                </div>
                                )} */}

                        </DialogHeader>

                        <form onSubmit= {handleSubmit} method='post'>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input 
                                        type={'text'} 
                                        id="username-1" 
                                        name="userName"  
                                        className={'border-neutral-500'}
                                        value={formData.userName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-1">Password</Label>
                                    <Input 
                                        type={'password'} 
                                        id="password-1" 
                                        name="password" 
                                        className={'border-neutral-500'}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                        
                                </div>
                                <Button 
                                    type="submit"
                                    disabled={loading} 
                                    variant='outline' 
                                    className={'bg-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 border-neutral-500 cursor-pointer w-full'}
                                    >
                                        {loading ? 'Signing In' : 'Sign In'}
                                </Button>
                            </div>
                                
                        </form>
                            <p>Don't have an account?Sign Up</p>
                        <BorderBeam duration={8} size={100} />
                    </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignIn
