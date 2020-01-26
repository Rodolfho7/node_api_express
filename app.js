const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


try {
  mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USER + ':' + process.env.MONGO_ATLAS_PW + '@nodeapi-zmxno.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true});
}
catch(error) {
  console.log('falha:\n' + error);
}


const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
})

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({erro: error.message});
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Umbler listening on port %s', port);
});