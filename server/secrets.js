const config = require('dotenv').config()

module.exports.jwtSecret = config.parsed['jwtSecret'];
module.exports.MongoURI = config.parsed['MongoURI'];

module.exports.AWS_ACCESS_KEY_ID = config.parsed['AWS_ACCESS_KEY_ID']
module.exports.AWS_SECRET_ACCESS_KEY = config.parsed['AWS_SECRET_ACCESS_KEY']
module.exports.BUCKET_NAME = config.parsed['BUCKET_NAME'];
