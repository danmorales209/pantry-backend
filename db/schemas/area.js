const {Schema, model } = require('mongoose');

const areaSchema = new Schema({
    areaName: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true,
        default: "Ambient"
    },
    capacity: {
        type: String,
        required: false
    }

});

const Area = model("Area", areaSchema);

module.exports = Area;
