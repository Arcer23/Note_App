import express from "express"
const router = express.Router();
import User from "../models/user.js"
router.post("/getallusers", (req, res) => {
    try {
        const users = User.find();
        if (!users) return res.status(404).json("Users Not Found")
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete("/deleteuser/:id", (req, res) => {
    const userid = req.params.id;
    try {
        const user = User.findByIdAndDelete(userid);
        res.status(200).send("User Deleted Successfully")
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put("/updateuser/:id", async (req, res) => {
    const userid = req.params.id;
    const updateduser = req.body;
    try {
        const update = await User.findByIdAndUpdate(userid, updateduser);
        if (!update) return res.status(404).json({ error: "Person Not Found" })
        res.status(200).json({ message: "User Updated Successfully" })
    } catch (error) {
        return res.status(500).json({error:"Internal Server Error"})
    }
})

export {router} 