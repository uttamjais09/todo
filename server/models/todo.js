import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        required: true ,
        type: String
    },
    description:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

   
});
const todo  = mongoose.model("todo",todoSchema);
export default todo ;