const config = require("../config/auth.config");
const db = require("../models");
const { user: User, refreshToken: RefreshToken } = db;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.register = (req, res) => {
    const user = new User({
        first_name:  req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "pending",
        image_path: "http://localhost:8080/images/default_profile_icon.png"
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
    }).exec(async (err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
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

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        let refreshToken = await RefreshToken.createToken(user);

        if (user.role === "pending") {
            return res.status(401).send({ 
                accessToken: null,
                message: "Your request is being processed!"
            });
        }
        
        res.status(200).send({
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            role: user.role,
            image_path: user.image_path,
            accessToken: token,
            refreshToken: refreshToken
        });
    });
};

exports.logout = async (req, res) => {
    try {
        await RefreshToken.deleteMany({user: req.body.id});
        return res.status(200).json({message: "User is logged out!"});
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(403).send({ message: "Refresh Token is required!" });
    }
    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        if (!refreshToken) {
            res.status(403).send({ message: "Refresh token is not in database!" });
            return;
        }
        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            res.status(403).send({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }
        let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        return res.status(200).send({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};