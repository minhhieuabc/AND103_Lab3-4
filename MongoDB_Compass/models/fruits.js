const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const Fruits = new Scheme({
    id_distributor: {type: Scheme.Types.ObjectId, ref: 'distributor'},
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    status: {type: Number},
    image: {type: Array},
    description: {type: String},
}, {timestamps: true});

module.exports = mongoose.model('fruit', Fruits);
/*
    type: Scheme.Types.ObjectId => kiểu dữ liệu id của MongoDB
    ref: là khóa ngoại
*/