// Blueprint for a user object
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds =10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

// Create and export the User model
const User = model("User", userSchema);

export default User;