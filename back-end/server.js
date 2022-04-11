const express = require("express");
const cors = require("cors");
// const dbConfig = require("./app/config/db.config");
require("dotenv").config();
const db = require("./app/models");
const User = require("./app/models/user.model");
var bcrypt = require("bcryptjs");
const Project = require("./app/models/project.model");
const Event = require("./app/models/event.model");
const { initial_users, initial_projects, initial_events } = require("./app/initial_data");
const path = require('path');

const app = express();

function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
app.use('/*', setupCORS);

// parse requests
// app.use(cors(corsOptions));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// serving images path

var publicDir = path.join(__dirname);
app.use(express.static(publicDir));

// connection to plantool database THIS IS FOR LOCAL DATABASE
// db.mongoose
//     .connect(
//         `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
//     )
//     .then(() => {
//         console.log("Successfully connected to database.");
//         initial();
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });
db.mongoose
    .connect(
        process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Successfully connected to database.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// inital run, if the database is empty, we create filler data
function initial() {
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            initial_users.map((user)=>{
                new User(user).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("Added new user to users collection");
                });
            });
            initial_projects.map((project)=>{
                new Project(project).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("Added new project to projects collection");
                });
            });
            initial_events.map((event)=>{
                new Event(event).save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("Added new event to events collection");
                });
            });
        }
    });
}

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port to listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});