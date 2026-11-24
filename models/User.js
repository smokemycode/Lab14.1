// Blueprint for a user object
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
userSchema.pre('save', async function () {
    if (this.isNew || this.isModified('password')) {
        const saltRounds =10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

// Hide the password field when converting the user document to JSON
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

// Create and export the User model
const User = model("User", userSchema);

export default User;