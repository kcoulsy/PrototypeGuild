const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, minlength: 3, required: true },
        description: { type: String, maxlength: 200 },
        type: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date },
        attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        hidden: Boolean
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
};
