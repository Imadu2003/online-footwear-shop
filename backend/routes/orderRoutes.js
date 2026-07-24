const express = require('express');
const router = express.Router();
const { addOrderItems, getOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', addOrderItems);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;