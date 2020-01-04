const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders')

router.get('/', ordersController.orders_gell_all);
router.post('/', ordersController.orders_create_order);
router.get('/:orderId', ordersController.orders_gell_order);
router.delete('/:orderId', ordersController.orders_delete_order);

module.exports = router;