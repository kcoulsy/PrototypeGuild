const pick = require('lodash/pick');

const { ObjectID } = require('mongodb');
const { User } = require('../Models/User');

exports.create = (req, res) => {
    const body = pick(req.body, [
        'username',
        'password',
        'characterName',
        'discordTag',
        'playerClass',
        'playerRole',
        'professionOne',
        'professionTwo',
        'applicationJSON'
    ]);
    body.rank = 'Member';
    body.enabled = false;
    body.deleted = false;
    body.username = body.username.toLowerCase();

    const user = new User(body);
    user.save()
        .then(() => {
            return user.createToken('x-auth');
        })
        .then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(e => {
            res.status(400).send(e);
        });
};

exports.find = (req, res) => {
    const q = pick(req.body, ['username', '_id']);

    if (q.username) {
        q.username = { $regex: `^${q.username}` };
    }

    q.enabled = true;
    q.deleted = false;

    User.find(q).then(response => {
        res.send(response);
    });
};

exports.findSelf = (req, res) => {
    res.send(req.user);
};

exports.login = (req, res) => {
    const body = pick(req.body, ['username', 'password']);

    User.findByCredentials(body.username, body.password)
        .then(user => {
            user.removeToken();
            user.createToken('x-auth').then(token => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch(err => res.status(400).send(err));
};

exports.logout = (req, res) => {
    req.user.removeToken(req.token).then(
        () => {
            res.status(200).send();
        },
        err => {
            res.staus(400).send(err);
        }
    );
};

exports.findApplicants = (req, res) => {
    const q = pick(req.body, ['username', '_id']);

    if (q.username) {
        q.username = { $regex: `^${q.username}` };
    }
    q.enabled = false;
    q.deleted = false;

    User.find(q).then(response => {
        res.send(response);
    });
};

exports.acceptApplicant = (req, res) => {
    const { id } = req.params;
    const body = pick(req.body, ['enabled']);
    body.enabledBy = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ error: 'User ID is not valid' });
    }
    return User.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, useFindAndModify: false }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send();
            }
            const returnedUser = pick(user, [
                '_id',
                'username',
                'characterName',
                'enabled'
            ]);

            return res.send({ returnedUser });
        })
        .catch(e => {
            return res.status(400).send(e);
        });
};

exports.declineApplicant = (req, res) => {
    const { id } = req.params;
    const body = pick(req.body, ['deleted']);
    body.enabledBy = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({ error: 'User ID is not valid' });
    }

    return User.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, useFindAndModify: false }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send();
            }
            const returnedUser = pick(user, [
                '_id',
                'username',
                'characterName',
                'deleted'
            ]);

            return res.send({ returnedUser });
        })
        .catch(e => {
            return res.status(400).send(e);
        });
};

/*
 *   User password update, user must match the existing password to update.
 */
exports.updateUser = (req, res) => {
    const body = pick(req.body, [
        '_id',
        'characterName',
        'discordTag',
        'playerClass',
        'playerRole',
        'rank',
        'professionOne',
        'professionTwo'
    ]);
};

/*
 *   Admin only route, allows the admin to reset a lost password
 *   Does not require confirmation
 */
exports.resetPassword = (req, res) => {
    const body = pick(req.body, ['_id', 'password']);

    User.findOne({ _id: body._id }).then(user => {
        if (!user) {
            res.status(404).send();
        }

        user.updatePassword(body.password).then(user => {
            if (!user) {
                res.status(404).send();
            }

            res.send(user);
        });
    });
};

/*
 *   User password update, user must match the existing password to update.
 */
exports.updatePassword = (req, res) => {
    const body = pick(req.body, ['_id', 'currentPassword', 'newPassword']);

    User.findByCredentials(req.user.username, body.currentPassword)
        .then(user => {
            if (!user) {
                res.status(404).send();
            }

            user.updatePassword(body.newPassword).then(user => {
                if (!user) {
                    res.status(404).send();
                }

                res.send(user);
            });
        })
        .catch(err => res.status(400).send(err));
};
