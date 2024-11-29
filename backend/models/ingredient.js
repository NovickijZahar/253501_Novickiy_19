import mongoose from 'mongoose';

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

export default mongoose.model('Ingredient', IngredientSchema);