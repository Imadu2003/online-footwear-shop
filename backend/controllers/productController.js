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


module.exports = {
    getProducts
};

