const AreaStore = require('./../store/area');

class AreaModel {
    constructor(logger = console) {
        this.logger = logger;
        this.store = new AreaStore(this.logger);

    };

    // _checkPermissions() {}

    async createArea(name, temperature, capacity = null) {
        return await this.store.createOne(name, temperature, capacity = null)
            .catch(error => {
                this.logger.error(error);
                throw error;
            })
    }
}

module.exports = AreaModel;