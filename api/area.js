const {
    Router
} = require('express');
const router = Router();
const AreaModel = require('./../db/model/area');
const logger = require('./../utilities/logger').child({
    service: 'Area'
})

const model = new AreaModel(logger)
router.get("/", (req, res) => {
    console.log("Area GET endpoint");
    res.status(200)
        .send("Fart");
});

router.post("/", (req, res) => {

    logger.info("Starting create area", {
        context: req.query
    })
    const {
        name,
        temperature,
        capacity
    } = req.body;
    return model.createArea(name, temperature, capacity)
        .then(() => {
            res.send('Success');
        }).catch(error => {
            console.error(error)
            res.status(500).send("An error occured whilst creating an area")
        });

})

module.exports = router;