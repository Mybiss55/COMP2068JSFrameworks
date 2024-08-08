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
        required: false, // To avoid issues when creating a new user, hash it elsewhere
        oauthId: { type: String, required: false },
        oauthProvider: { type: String, required: false },
        created: { type: Date, default: Date.now },
    },
};
// Create the schema
const dataSchema = new mongoose.Schema(dataSchemaObj);
// Add passport-local-mongoose plugin
dataSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', dataSchema);