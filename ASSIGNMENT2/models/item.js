var mongoose = require('mongoose');
// Define the schema
const dataSchemaObj = {
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Create and export the model
module.exports = mongoose.model('Item', dataSchema);