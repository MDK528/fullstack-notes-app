import React,{ useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { ShimmerButton } from "@/components/ui/shimmer-button.jsx"
import { useNavigate, Link } from 'react-router-dom'
import authService from '@/services/auth.service.js'
import { toastManager } from "@/components/ui/toast"
import { Info } from "lucide-react"


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
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await authService.login(formData)
            navigate('/notes')
        } catch (err) {
            setError(err.message)
            // toastManager.add({
            //     title: "Error",
            //     description: err.message,
            //     type: "error"
            //     })

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

                    <DialogContent 
                        className='bg-foreground dark:bg-background border-neutral-700 dark:border-neutral-700 text-neutral-100 dark:text-neutral-100 
                        sm:max-w-97'
                    >
                        <DialogHeader>
                            <DialogTitle>Sign In</DialogTitle>
                            <DialogDescription>
                                    Enter your credentials to access your account.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit= {handleSubmit}>
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
                                    className={'mt-4 bg-foreground hover:bg-neutral-800 hover:text-neutral-200 border-neutral-500 cursor-pointer w-full'}
                                    >
                                        {loading ? 'Signing In' : 'Sign In'}
                                </Button>

                                <div className='w-full h-2 text-red-600 font-semibold flex items-center justify-center gap-1'>
                                    {
                                        error && <>
                                                    <Info height={16} width={16}/>
                                                    <p className="text-sm text-center">
                                                            {error}
                                                    </p>
                                                 </>
                                    }
                                </div>
                            </div>
                                
                        </form>
                            <p>Don't have an account? Sign Up</p>
                        <BorderBeam duration={8} size={100} />
                    </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignIn
