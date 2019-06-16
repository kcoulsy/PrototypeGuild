const { Recruitment } = require('../Models/Recruitment');
const { Post } = require('../Models/Post');

exports.find = (req, res) => {
    Recruitment.find()
        .then(playerClasses => {
            if (!playerClasses) res.status(404).send();

            Post.find(
                {
                    hidden: false
                },
                null,
                {
                    limit: 5,
                    sort: { createdAt: -1 }
                }
            )
                .then(posts => {
                    if (!posts) res.status(404).send();

                    res.send({
                        playerClasses,
                        posts
                    });
                })
                .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
};
