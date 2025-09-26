import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minLength:2,
        maxLength: 20,
    },
    username: {
        unique: true,
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minLength:5,
        maxLength: 10,
        lowercase: true,
        match: /^[a-zA-Z][a-zA-Z0-9._]{4,9}$/,
    },
    email: {
        unique: true,
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    profilePic: {
        type: String,
        default: '/uploads/user_default.png',
    },
    description: {
        type: String,
        maxLength: 50,
        trim: true,
        default: '',
    },
    birthDate: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    }
}, {timeStamp: true});

const userModel = mongoose.model("User", userSchema);

export default userModel;