const aws = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = require('./secrets');

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAcessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});


const uploadImage = async (file, res) => {
    const s3Bucket = new aws.S3({ params: { Bucket: BUCKET_NAME } })
    const file_ext = file.originalname.split('.').pop();
    const params = {
      Body: file.buffer,
      Key: `avatar/${uuid.v4()}.${file_ext}`,
    };
    let location = '';
    await s3Bucket.upload(params, (err, data) => {
        if (err) {
            throw err;
        }
        res.json({link: data.Location});
    });
};

module.exports.uploadImage = uploadImage;
