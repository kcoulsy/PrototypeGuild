const pick = require('lodash/pick');

const { Event } = require('../models/Event');

exports.create = (req, res) => {
    const body = pick(req.body, ['title', 'description', 'date', 'type']);
    body.createdBy = req.user._id;
    body.attendance = [];
    body.date = new Date(body.date * 1000);
    body.hidden = false;

    const event = new Event(body);
    event
        .save()
        .then(doc => {
            if (!doc) res.status(404).send();

            res.send(doc);
        })
        .catch(err => res.status(400).send(err));
};

exports.attend = (req, res) => {
    const {user} = req;
    const { _id } = req.body;

    Event.findOneAndUpdate(
        { _id },
        {
            $addToSet: { attendance: user._id }
        },
        { new: true, useFindAndModify: false }
    )
        .then(event => {
            if (!event) res.status(404);

            res.send(event);
        })
        .catch(err => res.status(400).send(err));
};

exports.unattend = (req, res) => {
    const {user} = req;
    const { _id } = req.body;

    Event.findOneAndUpdate(
        { _id },
        {
            $pull: { attendance: user._id }
        },
        { new: true, useFindAndModify: false }
    )
        .then(event => {
            if (!event) res.status(404);

            res.send(event);
        })
        .catch(err => res.status(400).send(err));
};

exports.find = (req, res) => {
    const { id } = req.params;
    const q = {
        hidden: false
    };

    if (id) {
        q._id = id;
    }

    Event.find(q)
        .populate('createdBy', 'characterName _id playerRole playerClass')
        .populate('attendance', 'characterName _id playerRole playerClass')
        .then(events => {
            if (!events) {
                res.status(404).send();
            }
            res.send(events);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

exports.remove = (req, res) => {
    const { _id } = req.body;
    Event.findOneAndUpdate(
        { _id },
        {
            $set: {
                hidden: true
            }
        },
        { new: true, useFindAndModify: false }
    )
        .then(event => {
            if (!event) res.status(404).send();

            res.send({ event });
        })
        .catch(err => res.status(400).send(err));
};

exports.update = (req, res) => {
    const body = pick(req.body, [
        '_id',
        'title',
        'description',
        'date',
        'type'
    ]);
    Event.findByIdAndUpdate(
        body._id,
        {
            $set: body
        },
        { new: true, useFindAndModify: false }
    )
        .then(event => {
            if (!event) res.status(404).send();

            res.send({ event });
        })
        .catch(err => res.status(400).send(err));
};
