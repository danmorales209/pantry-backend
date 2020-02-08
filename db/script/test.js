require('dotenv').config();
const db = require('./../schemas');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


return db.area.estimatedDocumentCount().then( results => {
    console.log(results);
}).catch(error => console.error(error))