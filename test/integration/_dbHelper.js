require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./../../utilities/logger');

module.exports = {
    connect: async function() {
        try {
            await mongoose.connect(process.env.MONGODB_URI_TEST, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            logger.debug('Successfully connected to Test DB');
            
        } catch (error) {
            logger.error(error)
        }
    }
}
