const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        name: String,
        type: String,
        client: String,
        value: Number,
        duration: Number,
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        }
    })
);



module.exports = Project;