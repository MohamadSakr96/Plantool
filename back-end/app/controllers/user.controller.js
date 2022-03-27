const User = require("../models/user.model");
const Project = require("../models/project.model");
const Event = require("../models/event.model");

// admin functions
// accept or reject new employees in notification section 
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

// projects functions
exports.getAllProjects = async (req, res) => {
    try {
        const all_projects = await Project.find();
        res.status(200).send(all_projects);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};
exports.createProject = async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            type: req.body.type,
            client: req.body.client,
            value: req.body.value,
            duration: req.body.duration
        });
        await project.save();
        res.status(200).send({ message: "new project added!" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

// events functions
exports.createEvent = async (req, res) => {
    try {
        const event = new Event({
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            user: req.body.user_id
        });
        await event.save(async (err, event) => {
            if (err) {
                res.status(500).send({ message: e.message });
            }else {
                const user = await User.where("_id").equals(req.body.user_id);
                user[0].events.push(event._id);
                await user[0].save();
            }
        });
        res.status(200).send({ message: "new event added!" });
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