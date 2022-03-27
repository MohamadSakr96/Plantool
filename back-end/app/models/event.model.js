const mongoose = require("mongoose");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        name: String,
        project_name: String,
        start_date: Date,
        end_date: Date,
    })
);

module.exports = Event;