// initalize dotenv
require('dotenv').config();

// Global configuration object
// Client secrets, API keys, and other sensitive information
const globals = {
    ConnectionString: {
        mongoDB: process.env.CONNECTION_STRING_MONGODB,
        github: {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackUrl: process.env.GITHUB_CALLBACK_URL,
        },
    }
    }
// Export the globals object
module.exports = globals;