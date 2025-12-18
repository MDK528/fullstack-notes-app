import { ZodError } from "zod"

const validate = (schema) => {

    return (req, res, next)=>{
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    "success": false,
                    "message": error.issues[0].message,
                });
            }
        }
    }
}

export {validate}

    
