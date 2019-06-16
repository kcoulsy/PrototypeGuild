const { Post } = require('../Models/Post');

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        imageUrl: req.file.path,
        createdAt: new Date(),
        hidden: false
    });
    post.save()
        .then(doc => {
            if (!doc) res.status(404).send();

            res.send(doc);
        })
        .catch(err => res.status(400).send(err));
};

exports.findById = (req, res) => {
    Post.find({ _id: req.params.id })
        .then(posts => {
            if (!posts) res.status(400).send();

            res.send(posts);
        })
        .catch(err => res.status(400).send(err));
};

exports.find = (req, res) => {
    Post.find({
        hidden: false
    })
        .then(posts => {
            if (!posts) res.status(404).send();

            res.send(posts);
        })
        .catch(err => res.status(400).send(err));
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
            if (!post) res.status(404).send();

            res.send({ post });
        })
        .catch(err => res.status(400).send(err));
};
