const {
    Router
} = require('express')
const areaRoutes = require("./area");

const router = Router();

router.use("/area", areaRoutes);

router.get("/", (req, res) => {
    console.log("App server hit");

    res.status(200).send("Oh hai");
});

module.exports = router;