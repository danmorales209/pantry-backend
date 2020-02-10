require('dotenv').config();
const express = require('express');
const http = require("http")
const port = process.env.PORT || 3001;
const path = require('path');
const routes = require("./api");
const mongoose = require('mongoose');
const logger = require('./utilities/logger');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(routes);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static("pantry-app/dist"))
}

app.listen(port, () => {
    logger.info("Server Started", {port: port})
    console.log(`Server listening on port ${port}`);
})
