const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listen on prot ${port}`)
});

const uri = 'mongodb+srv://MinhHieu:lqHpS1EwaiheKXCZ@cluster0.g1m0els.mongodb.net/md18303';
const mongoose = require('mongoose');
const carModel = require('./CarModel');

// Home
app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    let cars = await carModel.find();

    console.log(cars);
    res.send(cars);
});

// Insert
app.get('/add_car', async (req, res) => {
    await mongoose.connect(uri);
    let car = {
        name: 'C-Class',
        automaker: 'Mercedes-Benz', 
        price: 55000,
        production_year: 2022
    }
    const addCar = await carModel.create(car);
    console.log(addCar);
    let cars = await carModel.find();

    console.log(cars);
    res.send(cars);
});

// Delete
app.get('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);
    let id = req.params.id;
    console.log(id);

    await carModel.deleteOne({_id:id});
    res.redirect('../')
});

//Update
app.get('/update/:name', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket noi voi DB thanh cong');

    let nameCar = req.params.name;
    console.log(nameCar);
    let newName = 'R-Class';
    await carModel.updateOne({name: nameCar}, {name: newName});
    let Car = await carModel.find({});
    res.send(Car);
});