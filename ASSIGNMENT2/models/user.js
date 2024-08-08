// Simple Model for User, extended with plugin
// User passport-local-mongoose plugin to simplify the authentication process
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const dataSchemaObj = {
    username: {
        type: String,
        required: true,
    },
    password: { // Never store passwords in plain text
        type: String,
        required: true,
    },
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Add passport-local-mongoose plugin
dataSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', dataSchema);