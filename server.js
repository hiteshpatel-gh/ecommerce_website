const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 9669;
const config = require('./DB.js');
const productCatgRoute = require('./admin/productcatg.route.js');
const stateRoute = require('./admin/state.route.js');
const cityRoute = require('./admin/city.route.js');
const vendorRoute = require('./vendor/vendor.route.js');
const productRoute = require('./product/product.route.js');
const customerRoute = require('./customer/customer.route.js');
const billRoute = require('./admin/bills/bill.route.js');
const paymentRoute = require('./admin/bills/paymentdetails.route.js');
const paymentdetailsRoute = require('./admin/bills/paymentdetails.route.js');
const router = require('./payment.js');
const emailrouter = require('./emailmgt.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/productcatg', productCatgRoute);
app.use('/state', stateRoute);
app.use('/city', cityRoute);
app.use('/vendor', vendorRoute);
app.use('/product', productRoute);
app.use('/customer', customerRoute);
app.use('/bill', billRoute);
app.use('/paymentdetails', paymentdetailsRoute);
app.use('/payment',router)
app.use('/email', emailrouter);

mongoose.connect(config.URL).then( 
    () =>{console.log('Database is connected ' + config.URL)},
    err => {console.log('Cannot connect to the database ' + err)}
);
app.listen(PORT , ()=>{
    console.log('Server is running on localhost:' + PORT);
})