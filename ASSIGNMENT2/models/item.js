var mongoose = require('mongoose');
// Define the schema
const dataSchemaObj = {
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    created: Date
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Create and export the model
module.exports = mongoose.model('Item', dataSchema);