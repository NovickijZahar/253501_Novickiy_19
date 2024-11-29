import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    }],
    imageUrl: String
});

export default mongoose.model('Pizza', PizzaSchema);