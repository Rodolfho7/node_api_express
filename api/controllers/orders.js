const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_gell_all = (req, res, next) => {
    Order.find()
        .populate('product', 'name') //tras informacoes da id do produto, e apenas os dados de nome
        .exec()
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
}


exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(err => {
            return res.status(500).json({
                message:'Product not found'
            });
        })
}


exports.orders_gell_order = (req, res, next) => {
    Order.findById(req.params.orderId).exec()
        .then(order => {
            if(!order) {
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json(order);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
}


exports.orders_delete_order = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId}).exec()
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
}