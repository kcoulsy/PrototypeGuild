const express = require('express');

const router = express.Router();

const { Auth } = require('./../middleware/Auth');
const { AdminAuth } = require('./../middleware/AdminAuth');

const User = require('./User');
const Event = require('./Event');
const Home = require('./Home');
const Recruitment = require('./Recruitment');
const Post = require('./Post');

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

router.post('/post', Post.create);
router.get('/posts/:id', Post.findById);
router.get('/posts', Post.find);

module.exports = router;
