import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import{Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog.jsx'

import { BorderBeam } from "@/components/ui/border-beam"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { ShimmerButton } from "@/components/ui/shimmer-button.jsx"

function SignIn()
{
    return (
        <div>
            <Dialog>
                <form >

                    <DialogTrigger asChild>
                        <ShimmerButton className="shadow-2xl">
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
                        </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input type={'text'} id="username-1" name="username"  className={'border-neutral-500'}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-1">Password</Label>
                                    <Input type={'password'} id="password-1" name="username"  className={'border-neutral-500'}/>
                                </div>
                            </div>
                        <DialogFooter>
                            <Button variant='outline' className={'bg-neutral-700 hover:bg-neutral-800 hover:text-neutral-200 border-neutral-500 cursor-pointer w-full'}>
                                Sign In
                            </Button>

                        </DialogFooter>
                            <p>Don't have an account?<a href='/signup'>Sign Up</a></p>
                        <BorderBeam duration={8} size={100} />
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}

export default SignIn
