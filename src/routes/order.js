const express = require('express');
const orderSchema = require('../models/order');

const router = express.Router();

//Create a new order
router.post('/orders', (req, res) => {
    const order = new orderSchema(req.body);
    order.save().then(() => {
        res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all orders
router.get('/orders', (req, res) => {
    orderSchema.find({}).then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get an order by id
router.get('/orders/:id', (req, res) => {
    const _id = req.params.id;
    orderSchema.findById(_id).then(order => {
        if(!order) {
            return res.status(404).send();
        }
        res.send(order);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update an order by id
router.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { user, tshirt, quantity, total } = req.body;
    orderSchema
        .updateOne({_id: id}, { $set: { user, tshirt, quantity, total } })
        .then(() => {res.status(201).send(order);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete an order by id
router.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    orderSchema.findByIdAndDelete(id).then(order => {
        if(!order) {
            return res.status(404).send();
        }
        res.send(order);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;