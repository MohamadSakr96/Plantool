
// GENERATE SECRET KEY
// console.log(crypto.randomBytes(32).toString('hex'))

module.exports = {
    secret: "09af11f3535d34cff7686288866db38d30e89855b68499a511d922dd11216865",
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
};

// dotenv library