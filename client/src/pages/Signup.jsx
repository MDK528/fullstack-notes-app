import React, { useState } from 'react'
import
    {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@base-ui/react'
import { CloudUpload, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
    const [avatarFile, setAvatarFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

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
            const submitData = new FormData();
            submitData.append('fullName', formData.fullName);
            submitData.append('emailId', formData.emailId);
            submitData.append('userName', formData.userName);
            submitData.append('password', formData.password);
            
            if (avatarFile) {
                submitData.append('avatar', avatarFile);
            }
            
            await authService.register(submitData)

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

                            <div className="grid gap-2">
                                <Label htmlFor="file">Profile Picture</Label>
                                
                                {!previewUrl ? (
                                    <label 
                                        htmlFor="file" 
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <CloudUpload className="w-8 h-8 mb-3 text-muted-foreground"/>
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                        <input 
                                            id="file" 
                                            name="avatar"
                                            type="file" 
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setAvatarFile(file);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setPreviewUrl(reader.result);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                ) : (
                                    <div className="p-2 border rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-20 w-20 rounded-lg overflow-hidden border-2 border-border shrink-0">
                                                <img 
                                                    src={previewUrl} 
                                                    alt="Preview" 
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{avatarFile?.name}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {avatarFile?.size ? `${(avatarFile.size / 1024).toFixed(2)} KB` : ''}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewUrl(null);
                                                    setAvatarFile(null);
                                                    document.getElementById('file').value = '';
                                                }}
                                                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
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