const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const User = require("./app/models/user.model");
var bcrypt = require("bcryptjs");

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

// parse requests
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to plantool database
db.mongoose
    .connect(
        `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    )
    .then(() => {
        console.log("Successfully connected to database.");
        inital();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// inital run, if the database is empty, we create important rows in roles collection 

function inital() {
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new User({
                first_name: "admin",
                last_name: "admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync("admin123", 8),
                role: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("add 'admin' to users collection");
            });
        }
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my app." });
});

// set port to listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});