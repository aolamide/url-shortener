const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true
    },
    unique_name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
    
});
exports.urlModel = mongoose.model('Url', urlSchema);

