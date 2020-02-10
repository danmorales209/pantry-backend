const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    ownedAreas: [{
        area: {
            type: Schema.ObjectId,
            ref: "Area"
        }
    }]

});

const User = model("User", userSchema);

module.exports = User;