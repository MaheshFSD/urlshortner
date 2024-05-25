const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const {connectToMongoDB} = require('./configs/connection');
const urlRoute = require('./routes/url.route.js');
const staticRoute  = require('./routes/static.route.js');
const userRoute  = require('./routes/user.route');

const PORT = 8001;
const app = express();
dotenv.config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/url', urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

// ejs setup...
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectToMongoDB(process.env.MONGODBURL)
.then(() => {
    console.log('DB CONNECTED')
    const server = app.listen(PORT, function () {
        
        console.log('Server started at - ',PORT, server.address().address, server.address().port);
    });
})
.catch(err => console.log(err));