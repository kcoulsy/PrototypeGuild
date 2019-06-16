const { User } = require('../models/User');

const AdminAuth = (req, res, next) => {
    const token = req.header('x-auth');

    return User.findByToken(token)
        .then(user => {
            if (!user) return Promise.reject();
            if (!user.admin) return Promise.reject();
            req.user = user;
            req.token = token;
            next();
            return user;
        })
        .catch(err => {
            return res.status(401).send(err);
        });
};

module.exports = {
    AdminAuth
};
