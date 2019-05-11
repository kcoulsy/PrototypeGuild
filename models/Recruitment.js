const mongoose = require('mongoose');

const Recruitment =  mongoose.model('Recruitment', {
    playerClass: {
        type: String
    },
    recruiting: {
        type: Boolean
    }
});

module.exports = {
    Recruitment
};
