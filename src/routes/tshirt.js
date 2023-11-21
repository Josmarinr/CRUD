const express = require('express');
const tshirtSchema = require('../models/tshirt');

const router = express.Router();

//Create a new tshirt
router.post('/tshirts', (req, res) => {
    const tshirt = new tshirtSchema(req.body);
    tshirt.save().then(() => {
        res.status(201).send(tshirt);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all tshirts
router.get('/tshirts', (req, res) => {
    tshirtSchema.find({}).then(tshirts => {
        res.send(tshirts);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a tshirt by id
router.get('/tshirts/:id', (req, res) => {
    const _id = req.params.id;
    tshirtSchema.findById(_id).then(tshirt => {
        if(!tshirt) {
            return res.status(404).send();
        }
        res.send(tshirt);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a tshirt by id
router.put('/tshirts/:id', (req, res) => {
    const { id } = req.params;
    const { name, size, color, price, stock, image } = req.body;
    tshirtSchema
        .updateOne({_id: id}, { $set: { name, size, color, price, stock, image } })
        .then(() => {res.status(201).send(tshirt);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a tshirt by id
router.delete('/tshirts/:id', (req, res) => {
    const { id } = req.params;
    tshirtSchema.findByIdAndDelete(id).then(tshirt => {
        if(!tshirt) {
            return res.status(404).send();
        }
        res.send(tshirt);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = router;