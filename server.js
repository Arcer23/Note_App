import express from "express"
const app = express();
import database from "./database-config.js"
import { router as authRouter } from './auth.js';
import { router as userRouter } from "./routes/user.routes.js"
import {router as notesRouter} from "./routes/notes.routes.js"
import jwt from "jsonwebtoken"
app.use(express.json());


function checkuserRole(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next
    } else {
        return res.status(403).json({ message: "Access Denied" })
    }
}
function authenciatetoken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, "pranish", (error, user) => {
        if (error) return res.status(403);
        req.user = user;
        next();
    })
}
app.use("/auth", checkuserRole, authenciatetoken, authRouter)
app.use('/', userRouter)
app.use("/",notesRouter)



app.listen(3000, () => {
    console.log("Server is Running At The Port", 3000)
})