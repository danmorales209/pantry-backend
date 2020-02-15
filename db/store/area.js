const db = require('./../schemas');

class AreaStore {
    constructor(logger = console) {
        this.logger = logger;
        this.db = db.Area;
    };
    async getAll(owner) {

        return await this.db.find({
            owner: owner
        }).exec().then(results => {
            return results;
        }).catch(error => {
            this.logger.error(error)
            throw error;
        })

    };
    async createOne(name, temperature, capacity = null) {
                
        return await this.db.create({
            areaName: name,
            temperature: temperature,
            capacity: capacity
        }).then(() => {
            this.logger.info('Document successfully created.', {name, temperature, capacity})
        }).catch( error => {
            this.logger.error(error.message, {context: {name, temperature, capacity}, err: error})
            throw error;
        });
    }
}

module.exports = AreaStore;