const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
    name:{
        type: String, 
        require: true
    },
    automaker:{
        type: String, 
        require: true
    },
    price:{
        type: Number, 
    },
    production_year:{
        type: Number, 
    }
});

const carModel = new mongoose.model('car', carSchema);
module.exports = carModel;