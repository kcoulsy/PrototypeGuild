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
        required: true,
        maxlength: 5000
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date
    },
    featured: {
        type: Boolean
    }
});

module.exports = {
    Post
};
