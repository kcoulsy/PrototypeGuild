const { Recruitment } = require('../Models/Recruitment');
const { Post } = require('../Models/Post');

exports.find = (req, res) => {
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
}