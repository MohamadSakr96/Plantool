const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user.role === "admin") {
            next();
            return;
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
        // Role.find(
        //     {
        //         _id: { $in: user.roles } 
        //     },
        //     (err, roles) => {
        //         if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //         }
        //         for (let i = 0; i < roles.length; i++) {
        //             if (roles[i].name === "admin") {
        //                 next();
        //                 return;
        //             }
        //         }
        //         res.status(403).send({ message: "Require Admin Role!" });
        //         return;
        //     }
        // );
    });
};

isEmployee = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user.role === "employee") {
            next();
            return;
        }
        res.status(403).send({ message: "Require Employee Role!" });
        return;
        // Role.find(
        //     {
        //         _id: { $in: user.roles } 
        //     },
        //     (err, roles) => {
        //         if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //         }
        //         for (let i = 0; i < roles.length; i++) {
        //             if (roles[i].name === "employee") {
        //                 next();
        //                 return;
        //             }
        //         }
        //         res.status(403).send({ message: "Require Employee Role!" });
        //         return;
        //     }
        // );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isEmployee
};
module.exports = authJwt;