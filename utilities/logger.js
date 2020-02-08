const bunyan = require("bunyan");

const logger = bunyan.createLogger({
    name: "Pantry-App-Server",
    serializers: {
        req: bunyan.stdSerializers.req
    },
    src: true
});

module.exports = logger;