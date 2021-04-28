const aws = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = require('./secrets');

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAcessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});


const uploadImage = async (file, folder) => {
    const s3Bucket = new aws.S3({ params: { Bucket: BUCKET_NAME } })
    const file_ext = file.originalname.split('.').pop();
    const params = {
      Body: file.buffer,
      Key: `${folder}/${uuid.v4()}.${file_ext}`,
    };
    let location = '';
    console.log('a')
    const uploadPromise = s3Bucket.upload(params).promise();
    console.log('b')
    return uploadPromise.then((data) => {
        return { url: data.Location, success: true };
    }).catch((err) => {
        return { success: false };
    });
};

module.exports.uploadImage = uploadImage;
