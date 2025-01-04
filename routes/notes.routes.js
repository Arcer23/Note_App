import express from "express"
const router = express.Router();
import Notes from "../models/notes.model.js"

router.post("/notes", async (req, res) => {
    const data = req.body;
    try {
        const notes = Notes(data);
        await notes.save();
        return res.status(200).json({ message: "Note Saved Successfully" });
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/getnotes", async (req, res) => {
    try {
        const notes = await Notes.find();
        if (!notes) return res.status(401).json({ message: "Unable to find notes" })
        return res.status(200).json(notes)

    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put("/updatenotes/:id", async (req, res) => {
    const noteid = req.params.id;
    const newnote = req.body;
    try {
        const response = await Notes.findByIdAndUpdate(noteid, newnote);
        return res.status(200).json({
            message: "Note Updated Successfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete("/deletenotes/:id",async(req,res)=>{
    const noteid = req.params.id;
    try{
        const deletenote = await Notes.findByIdAndDelete(noteid);
        return res.status(200).json({
            message: "Note Deleted Successfully"
        })

    }catch(error){
        return res.status(500).json(error)
    }
})

export {router}