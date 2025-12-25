import { SignupForm } from '@/components/signup-form'
import React, { useState } from 'react'
import
    {
        Card,
        CardAction,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@base-ui/react'
import { Info } from 'lucide-react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import authService from '@/services/auth.service'
import { toastManager } from '@/components/ui/toast'

function Signup()
{
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const[formData, setFormData] = useState({
        fullName: '',
        emailId: '',
        userName: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.register(formData)
            navigate('/signup/verify-otp')
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

    return (
        <div className='w-full min-h-screen flex items-center justify-center p-2'>
            <Card className="w-full max-w-sm mx-auto overflow-hidden">
                <CardHeader>
                    <CardTitle>Signup to your account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullName"
                                    type="text" 
                                    placeholder='Your Name'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="emailId"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.emailId}
                                    onChange={handleChange}
                                />
                                <p className='text-[12px] sm:text-sm flex gap-1 items-center'><Info height={16} width={16} /> This email will be verify with otp</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="userName"
                                    type="text"
                                    placeholder="you@example"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    name="password"
                                    type="password" 
                                    placeholder='* * * * * *'
                                    value={formData.password} 
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    
                        <Button type="submit" className="w-full cursor-pointer text-background bg-foreground rounded-md py-1.5 mt-4">
                            {loading ? 'Submitting' : 'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
                
        </div>
    )
}

export default Signup