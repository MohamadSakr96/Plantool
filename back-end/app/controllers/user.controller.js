const mongoose = require("mongoose");
const User = require("../models/user.model");

exports.getPendingRequests = async (req, res) => {
    try {
        const pending_users = await User.where("role").equals("pending").select("first_name last_name");   
        res.status(200).send(pending_users);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
exports.acceptRequest = async (req, res) => {
    try {
        const user = await User.where("_id").equals(req.body._id);
        user[0].role = "employee";
        await user[0].save();
        res.status(200).send("Added a new employee!");
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
exports.rejectRequest = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.body._id });
        res.status(200).send("Deleted employee request!");
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};


// test functions 
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.employeeBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};