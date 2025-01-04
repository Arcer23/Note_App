import express, { response } from "express"
const router = express.Router();
import User from "./models/user.js"
import jwt from "jsonwebtoken"
router.post("/signup", async (req, res) => {
    const data = req.body;
    try {
        const user = User(data);
        const userinfo = await user.save();
        const token = jwt.sign({ id: user._id, username: user.username });
        res.status(200).json({ response: response, token: token },"pranish")
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:
                "internal server error "
        })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: "Please Sign Up First or will be redirected to the sign up page" })

        const token = jwt.sign({ id: user._id, email: user.email },"pranish");
        res.status(200).json({ response: "logged in successfully", token: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:
                "Internal Server Error"
        })
    }
})

router.get("/test", (req, res) => {
    res.send("this is testing")
})


export { router }