require('dotenv').config();

const SUPPESS_TEST_LOG = process.env.SUPPESS_TEST_LOG || true;

module.exports = {
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
    }
}