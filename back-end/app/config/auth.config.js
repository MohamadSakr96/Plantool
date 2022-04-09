
// GENERATE SECRET KEY
// console.log(crypto.randomBytes(32).toString('hex'))

require("dotenv").config();

module.exports = {
    secret: process.env.SECRET_KEY,
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
};
