const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);