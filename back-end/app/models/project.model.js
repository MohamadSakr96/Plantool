const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        name: String,
        type: String,
        client: String,
        value: Number,
        duration: Number
    })
);



module.exports = Project;