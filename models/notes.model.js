import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
})

const notes = mongoose.model('notes',notesSchema);
export default notes;