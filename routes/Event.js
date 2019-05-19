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
    Event.find({}).then(events => {
        res.send(events);
    });
};

exports.remove = (req, res) => {
    const { _id } = req.body;
    Event.findOneAndDelete({ _id }, null, (err, resp) => {
        if (err) return res.send(err);
        res.send(resp);
    });
};
