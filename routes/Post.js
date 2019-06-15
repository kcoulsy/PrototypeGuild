const { Post } = require('../Models/Post');

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        imageUrl: req.file.path,
        createdAt: new Date(),
        hidden: false
    });
    post.save().then(
        doc => {
            res.send(doc);
        },
        e => {
            res.status(400).send(e);
        }
    );
};

exports.findById = (req, res) => {
    Post.find({ _id: req.params.id }).then(
        posts => {
            res.send(posts);
        },
        e => {
            res.status(400).send(e);
        }
    );
};

exports.find = (req, res) => {
    Post.find({
        hidden: false
    }).then(
        posts => {
            res.send(posts);
        },
        e => {
            res.status(400).send(e);
        }
    );
};

exports.remove = (req, res) => {
    Post.findByIdAndUpdate(
        req.body._id,
        {
            $set: {
                hidden: true
            }
        },
        { new: true, useFindAndModify: false }
    )
        .then(post => {
            if (!post) {
                res.status(404).send();
            }
            res.send({ post });
        })
        .catch(e => {
            res.status(400).send();
        });
};
