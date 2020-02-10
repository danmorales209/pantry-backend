const db = require("./../schemas");
const bcrypt = require('bcrypt');

class UserStore {
    constructor(logger = console) {
        this.logger = logger;
        this.db = db.User;
        this.saltRounds = 10;

    };

    __verifyInput(doc) {
        let {
            email,
            password,
            firstName,
            lastName,
            ownedAreas
        } = doc;

        if (!email) {
            throw new Error("Missing required parameter: email");
        }
        if (!password) {
            throw new Error("Missing required parameterL password");
        }
        return {
            email,
            password,
            firstName: firstName || '',
            lastName: lastName || '',
            ownedAreas: ownedAreas || []
        };
    };
    async __hashPassword(password) {
        return await bcrypt.genSalt(this.saltRounds, (err, salt) => {
            if (err) {
                throw err;
            } else {
                return bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        return hash;
                    }
                });
            }
        });

    };
    async createUser(doc) {

        try {
            const {
                email,
                password,
                firstName,
                lastName,
                ownedAreas
            } = this.__verifyInput(doc);

            password = await this.__hashPassword(password);

            return await this.db.create(email, password, firstName, lastName, ownedAreas)
                .then(() => {
                    this.logger.info('User Successfully created', {
                        email,
                        firstName,
                        lastName
                    })
                })
        } catch (error) {
            this.logger.error(error);
            throw error;
        }


    };
}

module.exports = UserStore;