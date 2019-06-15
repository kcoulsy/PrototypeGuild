const { Recruitment } = require('../Models/Recruitment');
const { Post } = require('../Models/Post');

exports.find = (req, res) => {
    Recruitment.find().then(
        playerClasses => {
            Post.find({
                hidden: false
            }, null, {
                limit: 5,
                sort: { createdAt: -1 }
            }).then(
                posts => {
                    res.send({
                        playerClasses,
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
}