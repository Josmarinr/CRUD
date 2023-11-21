const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Create a new user
router.post('/users', (req, res) => {
    const user = new userSchema(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err);
    });
});

//Get all users
router.get('/users', (req, res) => {
    userSchema.find({}).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Get a user by id
router.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    userSchema.findById(_id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//Update a user by id
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
        .updateOne({_id: id}, { $set: { name, age, email } })
        .then(() => {res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err)});
});

//Delete a user by id
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findByIdAndDelete(id).then(user => {
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});


module.exports = router;