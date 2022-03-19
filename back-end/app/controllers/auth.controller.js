const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    const user = new User({
        first_name:  req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "pending"
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Request has been Sent!" });
    });
};

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var authorities = [];
        if (user.Role.length === 0) {
            
        }
    });
};