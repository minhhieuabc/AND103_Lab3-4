var express = require('express');
var router = express.Router();

// Thêm model
const Distributors = require('../models/distributors');
const Fruits = require('../models/fruits');
const Upload = require('../config/common/upload');

/*PHƯƠNG THỨC THÊM */
//Distributors
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const newDistributors = new Distributors({
            name: data.name
        });
        
        const result = await newDistributors.save(); // thêm vào database
        if(result){
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            });
        } else{
            res.json({
                "status": 400,
                "messenger": "Lỗi,thêm không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

//Fruits
router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const newFruits = new Fruits({
            id_distributor: data.id_distributor,
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description

        });
        
        const result = await newFruits.save(); // thêm vào database
        if(result){
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            });
        } else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

// Upload image
router.post('/add-fruit-with-file-image', Upload.array('image', 5), async (req, res) => {
    // Upload.array('image', 5) upload tối đa là 5 file ảnh
    // Upload.single('image') upload 1 file ảnh

    try {
        const data = req.body;
        const {files} = req;
        const urlImage = files.map((file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
        const newFruits = new Fruits({
            id_distributor: data.id_distributor,
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: urlImage,
            description: data.description       
        });

        const result = await newFruits.save(); // thêm vào database
        if(result){
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            });
        } else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

/*PHƯƠNG THỨC ĐỌC*/
// get all list fruits
router.get('/get-list-fruit', async (req, res) => {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruits",
            "data": data
        });
    } catch (error) {
        console.log(error);
    }
});
//get fruits by id
router.get('/get-list-fruit-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params // Lấy dữ liệu thông qua :id trên url gọi là param
        const data = await Fruits.findById(id).populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Fruits by id",
            "data": data
        });
    } catch (error) {
        console.log(error);
    }
});

/*PHƯƠNG THỨC SỬA*/
router.put('/update-fruit-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body; // Lấy dữ liệu từ body
        const updateFruit = await Fruits.findById(id);
        let result = null;

        if(updateFruit){
            updateFruit.id_distributor = data.id_distributor ?? updateFruit.id_distributor,
            updateFruit.name = data.name ?? updateFruit.name,
            updateFruit.quantity = data.quantity ?? updateFruit.quantity,
            updateFruit.price = data.price ?? updateFruit.price,
            updateFruit.status = data.status ?? updateFruit.status,
            updateFruit.image = data.image ?? updateFruit.image,
            updateFruit.description = data.description ?? updateFruit.description,
            result = await updateFruit.save();
        }

        if(result){
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công",
                "data": result
            });
        } else{
            res.json({
                "status": 400,
                "messenger": "Lỗi, cập nhật không thành công",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

/*PHƯƠNG THỨC XÓA*/
router.delete('/delete-list-fruit-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params // Lấy dữ liệu thông qua :id trên url gọi là param
        const deletFruit = await Fruits.findByIdAndDelete(id).populate('id_distributor');
        if(deletFruit){
            res.json({
                "status": 200,
                "messenger": "Xóa thành công",
                "data": deletFruit
            });
        } else{
            res.json({
                "status": 400,
                "messenger": "Xóa thất bại",
                "data": []
            });
        }

    } catch (error) {
        console.log(error);
    }
});


module.exports = router;