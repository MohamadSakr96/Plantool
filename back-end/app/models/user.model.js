const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        first_name:  String,
        last_name: String,
        email: String,
        password: String,
        role: String,
        image_path: String,
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    })
);

module.exports = User;