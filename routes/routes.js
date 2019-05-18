const express = require('express');

const router = express.Router();

const { Post } = require('../models/Post');
const { Recruitment } = require('../models/Recruitment');

const User = require('./User');

// apply to the guild
router.post('/users', User.create);
// user login
router.post('/users/login', User.login);
// find, used for applications, members, applicant, profile
router.post('/users/find', User.find);

// router.delete('/users/me/token', Authentication, User.logout);

router.post('/applicants', User.findApplicants);

// accecpt application
router.patch('/applicants/accept/:id', User.acceptApplicant); 

// delete application
router.patch('/applicants/decline/:id', User.declineApplicant); 


// router.get('/users/me', Authentication, User.findSelf);



router.get('/home', (req, res) => {
    Recruitment.find().then(playerClasses => {
        Post.find({}, null, {
            limit: 3,
            sort: {'createdAt': -1 }
        }).then(posts => {
            Post.find({featured: 'true'}, null, {
                limit: 5,
                sort: {'createdAt': -1 }
            }).then(featured => {
                res.send({
                    playerClasses,
                    featured,
                    posts
                });
            }, e => {
                res.status(400).send(e);
            });
        }, e => {
            res.status(400).send(e);
        });
    }, e => {
        res.status(400).send(e);
    });
})
router.post('/post', (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        imageUrl: req.body.imageUrl,
        createdAt: new Date(),
        featured: req.body.featured
    })
    post.save().then(doc => {
        res.send(doc);
    }, e => {
        res.status(400).send(e);
    })
});

router.get('/posts/:id', (req, res) => {
    Post.find({ _id: req.params.id }).then(posts => {
        res.send(posts);
    }, e => {
        res.status(400).send(e);
    });
});

router.get('/posts', (req, res) => {
    Post.find().then(posts => {
        res.send(posts);
    }, e => {
        res.status(400).send(e);
    });
});

router.get('/recruitment', (req, res) => {
    Recruitment.find().then(playerClasses => {
        res.send(playerClasses);
    }, e => {
        res.status(400).send(e);
    });
})

router.post('/recruitment', (req, res) => {
    const recruitment = new Recruitment({
        playerClass: req.body.playerClass,
        recruiting: req.body.recruiting
    })
    recruitment.save().then(doc => {
        res.send(doc);
    }, e => {
        res.status(400).send(e);
    })
});

router.patch('/recruitment', (req, res) => {
    Recruitment.findOneAndUpdate({
        playerClass: req.body.playerClass
    }, {
        $set: {
            recruiting: req.body.recruiting
        }
    }, { new: true }).then(playerClass => {
        if (!playerClass) {
            res.status(404).send();
        }
        res.send({playerClass});
    }, e => {
        res.status(400).send(e);
    });
})

module.exports = router;