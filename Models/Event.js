const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, minlength: 3, required: true },
        description: { type: String, maxlength: 200 },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
};
