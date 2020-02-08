const db = require('./../schemas');

class AreaStore {
    constructor(logger) {
        this.logger = logger || console;
        this.db = db.Area;
    };
    async getAll(owner) {

        return await this.db.find({
            owner: owner
        }).exec().then(results => {
            return results;
        }).catch(error => {
            this.logger.error(error)
        })

    };
    async createOne(name, temperature, capacity = null) {
        return await this.db.create({
            areaName: name,
            temperature: temperature,
            capacity: capacity
        }).then(() => {
            this.logger.info('Document successfully created.', {context: arguments})
        }).catch( error => {
            this.logger.error(error.message, {context: arguments, err: error})
            throw error;
        });
    }
}

module.exports = AreaStore;