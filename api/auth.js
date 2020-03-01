const router = require('express').Router();

router.get('/', (req, res, next) => {
    console.log(`THis is a test of the new routing system`);
    res.status(200).json({"this":"Is a test"});
})

module.exports = router;