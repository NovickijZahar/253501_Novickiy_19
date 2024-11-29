import mongoose from "mongoose";

const BasketSchema = new mongoose.Schema({
    content: [{
        pizza: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pizza'
        },
        count: {
            type: Number,
            required: true,
            default: 1
        }
    }],
});

export default mongoose.model('Basket', BasketSchema);