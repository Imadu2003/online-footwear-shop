const Product = require('../models/Product');

// Get all products
const getProducts = async (req,res) => {
    try{

 const products = await Product.find({}); //get the all items from database

 res.json(products); //send the items to the frontend as json format
    } catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



const createProduct = async(req,res) =>{
    try{
        const { name, price, category, image, description } = req.body;

        const product = new Product({
            name,
            price,
            category,
            image,
            description });


            const createdProduct = await product.save();
            res.status(201).json(createdProduct);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server Error - Could not create product    ' });
        }
};


module.exports = {
    getProducts,
    createProduct
};


