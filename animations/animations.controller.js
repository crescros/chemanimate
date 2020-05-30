const express = require('express');
const router = express.Router();
const animationService = require('./animation.service');

// routes
router.get('/', getAll);
router.get('/trials', getTrials);
router.get('/:id', getOne);

module.exports = router;

function getOne(req, res, next) {
    animationService.getOne(req.params.id)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getTrials(req, res, next) {
    animationService.getTrials()
        .then(animations => res.json(animations))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    animationService.getAll(req.query)
        .then(animations => res.json(animations))
        .catch(err => next(err));
}
