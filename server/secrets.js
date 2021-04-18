const config = require('dotenv').config()

module.exports.jwtSecret = config.parsed['jwtSecret'];
module.exports.MongoURI = config.parsed['MongoURI'];
