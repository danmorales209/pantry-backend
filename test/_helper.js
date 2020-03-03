require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./../utilities').logger;

const SUPPESS_TEST_LOG = process.env.SUPPESS_TEST_LOG || true;

module.exports = {
    /**
     * If SUPRESS_TEST_LOG is set to true, returns a logger object with empty methods
     * Otherwise, retures the console object for logging
     */
    logger: () => {
        if (SUPPESS_TEST_LOG) {
            return {
                trace: () => {},
                debug: () => {},
                info: () => {},
                log: () => {},
                warn: () => {},
                error: () => {},
                fatal: () => {}
            }
        } else {
            return console;
        }
    },

    /**
     * Sets up a connection to the mongoDB at MONGODB_URI_TEST
     */
    connect: async function () {
        try {
            await mongoose.connect(process.env.MONGODB_URI_TEST, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            logger.debug('Successfully connected to Test DB');

        } catch (error) {
            logger.error('An error occurred while connecting to the database', {
                error
            })
        }
    },

    /**
     * Drops the collection named by @collection
     * @param {String} collection 
     */
    drop: async function (collection) {
        try {
            await mongoose.connection.db.dropCollection(collection);
            logger.info(`Collection ${collection} succesfully dropped.`)
        } catch (error) {
            logger.error(`An error occurred while trying to drop collection ${collection}`, {
                error
            })
        }
    },
    dropAll: async () => {
        let collections = mongoose.connection.db.collections();
        try {
            collections.map(collection => {
                return await( collection.dropCollection() );
            })
        } catch (error) {

        }
    }
}