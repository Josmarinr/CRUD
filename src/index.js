const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRoutes = require('./routes/user');
const tshirtsRoutes = require('./routes/tshirt');
const ordersRoutes = require('./routes/order');



//Settings
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use('/api', usersRoutes);
app.use('/api', tshirtsRoutes);
app.use('/api', ordersRoutes);

//Routes    
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

app.listen(port, () => {
  console.log('Server is listening on port', port);
});