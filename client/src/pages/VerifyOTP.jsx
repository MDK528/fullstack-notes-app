import { Button } from "@/components/ui/button"
import
    {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"
import
    {
        Field,
        FieldDescription,
        FieldGroup,
        FieldLabel,
    } from "@/components/ui/field"
import
    {
        InputOTP,
        InputOTPGroup,
        InputOTPSlot,
    } from "@/components/ui/input-otp"
import { toastManager } from "@/components/ui/toast"
import authService from "@/services/auth.service"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export function VerifyOTP()
{
    const navigate = useNavigate()
    const[otp, setOtp]=useState('')
    const[loading, setLoading]=useState(false)

    const handleOtpVerify = async(e) => {
        e.preventDefault()
        setLoading(true)
            
        try {
            await authService.verifyOTP(otp)
            navigate('/home')
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
            <Card className="w-full max-w-[320px] mx-auto overflow-hidden">
                <CardHeader>
                    <CardTitle>Enter verification code</CardTitle>
                    <CardDescription>We sent a 6-digit code to your email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleOtpVerify}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                                <InputOTP maxLength={6} id="otp" value={otp} onChange={setOtp}>
                                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <FieldDescription>
                                    Enter the 6-digit code sent to your email.
                                </FieldDescription>
                            </Field>
                            <FieldGroup className={''}>
                                <Button type="submit" className={'cursor-pointer'}>{loading ? 'Verifying':'Verify'}</Button>
                                <FieldDescription className="text-center">
                                    Didn&apos;t receive the code? <a href="#">Resend</a>
                                </FieldDescription>
                            </FieldGroup>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
