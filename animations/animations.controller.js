const express = require('express');
const router = express.Router();
const animationService = require('./animation.service');

// routes
router.get('/', getAll);
router.get('/:id', getOne);

module.exports = router;

function getOne(req, res, next) {
    animationService.getOne(req.params.id)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    animationService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
