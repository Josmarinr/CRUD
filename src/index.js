const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usersRoutes = require('./routes/user');

//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggetSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API Users",
            version: '1.0.0',
        },
        servers:[
            {
                url: 'http://localhost:5000'
            }
        
        ]
    },
    apis: ['./routes/*.js']
};

//Settings
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use('/api', usersRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggetSpec)));

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

app.listen(port, () => {
  console.log('Server is listening on port', port);
});