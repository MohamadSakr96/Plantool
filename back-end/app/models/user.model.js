const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        first_name:  String,
        last_name: String,
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        password: String,
        role: String,
        image_path: {
            type: String,
            default: "http://localhost:8080/images/default_profile_icon.png"
        },

        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    })
);

module.exports = User;