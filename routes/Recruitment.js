const { Recruitment } = require('../Models/Recruitment');

exports.find = (req, res) => {
    Recruitment.find().then(
        playerClasses => {
            res.send(playerClasses);
        },
        e => {
            res.status(400).send(e);
        }
    );
};

exports.create = (req, res) => {
    const recruitment = new Recruitment({
        playerClass: req.body.playerClass,
        recruiting: req.body.recruiting
    });
    recruitment.save().then(
        doc => {
            res.send(doc);
        },
        e => {
            res.status(400).send(e);
        }
    );
};

exports.update = (req, res) => {
    Recruitment.findOneAndUpdate(
        {
            playerClass: req.body.playerClass
        },
        {
            $set: {
                recruiting: req.body.recruiting
            }
        },
        { new: true }
    ).then(
        playerClass => {
            if (!playerClass) {
                res.status(404).send();
            }
            res.send({ playerClass });
        },
        e => {
            res.status(400).send(e);
        }
    );
};
