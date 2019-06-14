const { Post } = require('../Models/Post');

exports.create = (req, res) => {
    console.log(req.file);
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        imageUrl: req.file.path,
        createdAt: new Date(),
        featured: req.body.path
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
    Post.find().then(
        posts => {
            res.send(posts);
        },
        e => {
            res.status(400).send(e);
        }
    );
};
