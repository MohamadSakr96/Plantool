const mongoose = require("mongoose");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        name: String,
        description: String,
        start_date: Date,
        end_date: Date,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })
);

module.exports = Event;