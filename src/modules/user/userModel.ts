import mongoose from "mongoose";
import userInterface from "./userInterface";

const useSchema = new mongoose.Schema<userInterface>({
    name: {
        type: String,
        required: true
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }

})

const userModel = mongoose.model('users', useSchema)
export default userModel