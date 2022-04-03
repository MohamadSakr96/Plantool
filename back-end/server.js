const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const User = require("./app/models/user.model");
var bcrypt = require("bcryptjs");

// FireBase
var admin = require("firebase-admin");

var serviceAccount = require("./secret/plantool-346019-firebase-adminsdk-yjsdk-d22df9843e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
var corsOptions = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type'
    ]
};
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
app.all('/*', setupCORS);

// parse requests
// app.use(cors(corsOptions));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// serving images path
app.use('/images', express.static('images'));

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

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port to listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});