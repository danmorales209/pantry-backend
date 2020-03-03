const router = require('express').Router();
const logger = require('./../utilities').logger;
const Auth = require('./../utilities').auth;

const auth = new Auth('this is a test!!!', 10, logger.child({
    service: 'Authorization'
}));

router.get('/', (req, res, next) => {
    console.log(`THis is a test of the new routing system`);
    res.status(200).json({
        "this": "Is a test"
    });
});

router.post('/test', (req, res, next) => {

    return Promise.resolve().then( () => {
        return auth.signToken(req.body.plain)
    }).then( token => {
        res.json({
            plain: req.body.plain,
            encoded: token
        })
    })

});

router.post('/decode', (req, res, next) => {

    return Promise.resolve().then( () => {
        return auth.verifyToken(req.body.token)
    }).then( decoded => {
        res.json({
            token: req.body.token,
            decoded: decoded
        })
    })

});

module.exports = router;