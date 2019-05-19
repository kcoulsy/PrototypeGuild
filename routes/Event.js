const pick = require('lodash/pick');

const { Event } = require('../Models/Event');

exports.create = (req, res) => {
    const body = pick(req.body, ['title', 'description']);
    body.createdBy = req.user._id;
    const event = new Event(body);
    event
        .save()
        .then(event => {
            res.send(event);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};
