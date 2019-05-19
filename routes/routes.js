const express = require('express');

const router = express.Router();

const { Post } = require('../Models/Post');
const { Recruitment } = require('../Models/Recruitment');
const { Auth } = require('./../middleware/Auth');
const { AdminAuth } = require('./../middleware/AdminAuth');

const User = require('./User');
const Event = require('./Event');

router.post('/users', User.create);
router.post('/users/login', User.login);
router.post('/users/find', Auth, User.find);
router.delete('/users/logout', Auth, User.logout);

router.post('/applicants', AdminAuth, User.findApplicants);
router.patch('/applicants/accept/:id', AdminAuth, User.acceptApplicant);
router.patch('/applicants/decline/:id', AdminAuth, User.declineApplicant);

router.post('/event', AdminAuth, Event.create);
router.delete('/event', AdminAuth, Event.remove);
router.patch('/event/attend', Auth, Event.attend);
router.patch('/event/unattend', Auth, Event.unattend);
router.get('/events', Auth, Event.find);
// router.get('/users/me', Authentication, User.findSelf);

router.get('/home', (req, res) => {
    Recruitment.find().then(
        playerClasses => {
            Post.find({}, null, {
                limit: 3,
                sort: { createdAt: -1 }
            }).then(
                posts => {
                    Post.find({ featured: 'true' }, null, {
                        limit: 5,
                        sort: { createdAt: -1 }
                    }).then(
                        featured => {
                            res.send({
                                playerClasses,
                                featured,
                                posts
                            });
                        },
                        e => {
                            res.status(400).send(e);
                        }
                    );
                },
                e => {
                    res.status(400).send(e);
                }
            );
        },
        e => {
            res.status(400).send(e);
        }
    );
});
router.post('/post', (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        imageUrl: req.body.imageUrl,
        createdAt: new Date(),
        featured: req.body.featured
    });
    post.save().then(
        doc => {
            res.send(doc);
        },
        e => {
            res.status(400).send(e);
        }
    );
});

router.get('/posts/:id', (req, res) => {
    Post.find({ _id: req.params.id }).then(
        posts => {
            res.send(posts);
        },
        e => {
            res.status(400).send(e);
        }
    );
});

router.get('/posts', (req, res) => {
    Post.find().then(
        posts => {
            res.send(posts);
        },
        e => {
            res.status(400).send(e);
        }
    );
});

router.get('/recruitment', (req, res) => {
    Recruitment.find().then(
        playerClasses => {
            res.send(playerClasses);
        },
        e => {
            res.status(400).send(e);
        }
    );
});

router.post('/recruitment', (req, res) => {
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
});

router.patch('/recruitment', (req, res) => {
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
});

module.exports = router;
