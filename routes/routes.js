const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
                '_' +
                file.originalname
        );
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

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
router.patch('/users', AdminAuth, User.updateUser);
router.patch('/users/update', Auth, User.updatePassword);
router.patch('/users/reset', User.resetPassword);
router.delete('/users/logout', Auth, User.logout);

router.post('/applicants', AdminAuth, User.findApplicants);
router.patch('/applicants/accept/:id', AdminAuth, User.acceptApplicant);
router.patch('/applicants/decline/:id', AdminAuth, User.declineApplicant);

router.post('/event', AdminAuth, Event.create);
router.patch('/event', AdminAuth, Event.update);
router.patch('/event/remove', AdminAuth, Event.remove);
router.patch('/event/attend', Auth, Event.attend);
router.patch('/event/unattend', Auth, Event.unattend);
router.get('/events/find', Event.find);
router.get('/events/find/:id', Event.find);


router.get('/home', Home.find);

router.get('/recruitment', Recruitment.find);
router.post('/recruitment', AdminAuth, Recruitment.create);
router.patch('/recruitment', AdminAuth, Recruitment.update);

router.post('/post', upload.single('image'), Post.create);
// router.get('/posts/:id', Post.findById);
router.get('/posts', Post.find);
router.patch('/posts/remove', Post.remove);

module.exports = router;
