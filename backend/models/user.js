import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'defaultUser'],
        required: true
    },
    basket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Basket',
    }
}, 
{
    timestamps: true,
});

export default mongoose.model('User', UserSchema);