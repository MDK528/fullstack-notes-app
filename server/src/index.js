import { configDotenv } from "dotenv";
import { app } from "./app.js"
import { connectionDB } from "./db/index.js"


configDotenv({
    path: './.env'
})

connectionDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`App listening at http://localhost:${process.env.PORT}`)
    })
})
.catch(()=>{
    console.error('MongoDB failed to connect')
})

