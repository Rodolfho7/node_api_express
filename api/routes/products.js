const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        //.select('name') - nomes dos campos que vai retornar na busca
        .exec().then(doc => {
            return res.status(200).json(doc);
    }).catch(err => {
        return res.status(500).json({
            erro: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

        return res.status(201).json({
        message: 'lidando com POST request para /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        if (doc) {
            return res.status(200).json(doc);
        } else {
            return res.status(404).json({message: 'id invalido para a busca de dados'});
        }
    }).catch(err => {
        res.status(500).json({error: err});
    })
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.updateOne({_id: id}, {$set: {price: req.body.price} }).exec().then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({error: err});
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id}).exec().then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return res.status(500).json({error: err});
    })
});

module.exports = router;