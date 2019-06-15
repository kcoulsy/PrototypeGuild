const pick = require('lodash/pick');

const { Event } = require('../Models/Event');

exports.create = (req, res) => {
    const body = pick(req.body, ['title', 'description', 'date', 'type']);
    body.createdBy = req.user._id;
    body.attendance = [];
    body.date = new Date(body.date * 1000);
    body.hidden = false;

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

exports.attend = (req, res) => {
    const user = req.user;
    const { _id } = req.body;

    Event.findOneAndUpdate(
        { _id },
        {
            $addToSet: { attendance: user._id }
        },
        { new: true },
        (err, resp) => {
            if (err) return res.send(err);
            res.send(resp);
        }
    );
};

exports.unattend = (req, res) => {
    const user = req.user;
    const { _id } = req.body;

    Event.findOneAndUpdate(
        { _id },
        {
            $pull: { attendance: user._id }
        },
        { new: true },
        (err, resp) => {
            if (err) return res.send(err);
            res.send(resp);
        }
    );
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
            res.send(events);
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
            if (!event) {
                res.status(404).send();
            }
            res.send({ event });
        })
        .catch(e => {
            res.status(400).send();
        });
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
            if (!event) {
                res.status(404).send();
            }
            res.send({ event });
        })
        .catch(e => {
            res.status(400).send();
        });
};
