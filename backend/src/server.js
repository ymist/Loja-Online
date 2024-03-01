import express from "express";
import {routes} from "./routes.js"
import "express-async-errors"
import cors from "cors"

const app = express();
app.use(express.json())

app.use(cors())

app.use((err, req, res, next)=>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status:"error",
        message:"Internal Error"
    })
})

app.use(routes)

app.listen(3333, () => console.log("Servidor Online!"));
