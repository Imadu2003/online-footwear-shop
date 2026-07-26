const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders, updateOrderStatus, getUserOrders } = require('../controllers/orderController');

router.post('/', addOrderItems);
router.get('/', getOrders);
router.get('/user/:userId', getUserOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;