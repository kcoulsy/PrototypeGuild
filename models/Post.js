const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    body: {
        type: String,
        maxlength: 5000
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date
    },
    hidden: {
        type: Boolean
    }
});

module.exports = {
    Post
};
