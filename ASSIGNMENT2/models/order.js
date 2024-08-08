var mongoose = require('mongoose');
// Define the schema
const dataSchemaObj = {
    name: {
        type: String,
        required: true,
    },
    // Make a list if you can
    items: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'TO DO',
    },
    // Calculate the total price automatically
    totalPrice: {
        type: Number,
        required: true,
    },
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Create and export the model
module.exports = mongoose.model('order', dataSchema);