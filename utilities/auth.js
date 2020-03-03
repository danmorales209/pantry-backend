const logger = require('./index').logger;
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

class Auth {
    constructor(secret, saltRounds = 10, logger = console) {
        this.logger = logger;
        this.saltRounds = saltRounds;
        this.secret = secret;
    };

    /**
     * Async function to hash a password
     * @param {String} plainText - String contiaining password 
     * @returns {String} Returns the password hash
     */
    async hashPassword(plainText) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashPassword = await bcrypt.hash(plainText, salt);
            return hashPassword;
        } catch (error) {
            this.logger.error({
                err: error
            }, "An error occurred whilst hashing a password");
            throw error;
        }
    };

    /**
     * Uses bcrpyt to compare a plaintext password against a hashed password
     * 
     * @param {String} plainText - String to compare 
     * @param {String} savedHash - hashed password
     * @returns {Boolean} true (match) or false
     */
    async verifyPassword(plainText, savedHash) {
        try {
            return await bcrypt.compare(plainText, savedHash);
        } catch (error) {
            this.logger.error({
                    err: error
                },
                'An error occurred whilst comparing a password');
            throw error;
        }
    };

    signToken(payload, options = {}) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, options, (err, token) => {
                if (err) {
                    this.logger.error({
                        err
                    }, "An error was encountered whilst signing a token");
                    reject(err);
                }
                resolve(token);
            })
        })
    };

    verifyToken(token, options = {}) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, options, (err, decoded) => {
                if (err) {
                    this.logger.error({
                        err
                    }, "An error was encountered whilst decoding a token");
                    reject(err);
                }
                resolve(decoded);
            })
        })

    };
};

module.exports = Auth;