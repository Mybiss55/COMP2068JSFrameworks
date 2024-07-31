// initalize dotenv
require('dotenv').config();

// Global configuration object
// Client secrets, API keys, and other sensitive information
const globals = {
    ConnectionString: {
        mongoDB: process.env.CONNECTION_STRING_MONGODB
    }
    }
// Export the globals object
module.exports = globals;