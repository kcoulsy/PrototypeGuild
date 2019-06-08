const express = require('express');

const router = express.Router();

const { Post } = require('../Models/Post');
const { Auth } = require('./../middleware/Auth');
const { AdminAuth } = require('./../middleware/AdminAuth');

const User = require('./User');
const Event = require('./Event');
const Home = require('./Home');
const Recruitment = require('./Recruitment');

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
router.get('/events/find', Auth, Event.find);

router.get('/home', Home.find);

router.get('/recruitment', Recruitment.find);
router.post('/recruitment', AdminAuth, Recruitment.create);
router.patch('/recruitment', AdminAuth, Recruitment.update);


// router.post('/post', (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         body: req.body.body,
//         imageUrl: req.body.imageUrl,
//         createdAt: new Date(),
//         featured: req.body.featured
//     });
//     post.save().then(
//         doc => {
//             res.send(doc);
//         },
//         e => {
//             res.status(400).send(e);
//         }
//     );
// });

// router.get('/posts/:id', (req, res) => {
//     Post.find({ _id: req.params.id }).then(
//         posts => {
//             res.send(posts);
//         },
//         e => {
//             res.status(400).send(e);
//         }
//     );
// });

// router.get('/posts', (req, res) => {
//     Post.find().then(
//         posts => {
//             res.send(posts);
//         },
//         e => {
//             res.status(400).send(e);
//         }
//     );
// });


module.exports = router;
