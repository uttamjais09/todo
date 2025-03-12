import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        required: true ,
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String ,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});
const User  = mongoose.model("User",userSchema);
export default User ;