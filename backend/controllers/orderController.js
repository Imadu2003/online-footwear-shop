const Order = require('../models/Order');


//when create new order (within when customer checkout new order)
const addOrderItems = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice, user } = req.body;
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            const order = new Order({
                user, 
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
            });
            const createdOrder = await order.save();
            res.status(201).json({ success: true, data: createdOrder });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Unable to create order' });
    }
};

// Orders ඔක්කොම බලන්න (Admin ට)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Order එකේ තත්ත්වය (Status) වෙනස් කරන්න (Admin ට)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status;
            if (req.body.status === 'Delivered') {
                order.isPaid = true;
                order.paidAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.json({ success: true, data: updatedOrder });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = { addOrderItems, getOrders, updateOrderStatus };