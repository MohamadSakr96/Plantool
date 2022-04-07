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

        position: {
            type: String,
            default: "N/A"
        },
        salary: {
            type: Number,
            default: null
        },
        vacation_days: {
            type: Number,
            default: 20
        },
        notification_token: String,
        events: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    })
);

module.exports = User;