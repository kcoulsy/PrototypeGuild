const pick = require('lodash/pick');
// const webhook = require('webhook-discord');

// const Hook = new webhook.Webhook('https://discordapp.com/api/webhooks/579728009486008363/q9y0I50uLjfbmHqummyHplub7TP3EbEcvJVBDKtnRr5-qjMP_qG7Qr8VU98R0tGiCHQK');

const { Event } = require('../Models/Event');

exports.create = (req, res) => {
    const body = pick(req.body, ['title', 'description', 'date', 'type']);
    body.createdBy = req.user._id;
    body.attendance = [];
    body.date = new Date(body.date * 1000);

    const event = new Event(body);
    event
        .save()
        .then(event => {
            res.send(event);
            // Hook.success('Test Name', 'hello there')
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
    const { id } = req.body;
    const q = {};

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
    Event.findOneAndDelete({ _id }, null, (err, resp) => {
        if (err) return res.send(err);
        res.send(resp);
    });
};
