const { Recruitment } = require('../Models/Recruitment');

exports.find = (req, res) => {
    Recruitment.find()
        .then(playerClasses => {
            if (!playerClasses) res.status(404).send();

            res.send(playerClasses);
        })
        .catch(err => res.status(400).send(err));
};

exports.create = (req, res) => {
    const recruitment = new Recruitment({
        playerClass: req.body.playerClass,
        recruiting: req.body.recruiting
    });

    recruitment
        .save()
        .then(doc => {
            if (!doc) res.status(400).send();

            res.send(doc);
        })
        .catch(err => res.status(400).send(err));
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
        { new: true, useFindAndModify: false }
    )
        .then(playerClass => {
            if (!playerClass) res.status(404).send();

            res.send({ playerClass });
        })
        .catch(err => res.status(400).send(err));
};
