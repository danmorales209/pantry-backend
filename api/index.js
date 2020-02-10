const {
    Router
} = require('express')
const areaRoutes = require("./area");

const router = Router();

router.use("/area", areaRoutes);

router.get("/", (req, res) => {
    console.log(`${req.url} was hit by ${req.ip} at ${(new Date()).toString()}`)

    return res.status(200).json({msg:"Oh hai"});
});

module.exports = router;