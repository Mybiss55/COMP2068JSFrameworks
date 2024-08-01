var mongoose = require('mongoose');
// Define the schema
const dataSchemaObj = {
    name: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        default: 'TO DO',
    },
    // Calculate the total price automatically
    totalPrice: {
        type: Number,
    },
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Create and export the model
module.exports = mongoose.model('order', dataSchema);