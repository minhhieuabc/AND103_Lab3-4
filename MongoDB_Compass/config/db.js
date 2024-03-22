const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Đối với database dùng compass
const local = "mongodb://localhost:27017/Vitamin";
const connect = async () => {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('connect success');
    } catch (error) {
        console.log(error);
        console.log('connect fail');
    }
}
module.exports = {connect}