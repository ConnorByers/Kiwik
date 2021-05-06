## Kiwik

This is a Twitter Clone/Message Board that I made using MongoDB, Amazon S3, Express, React, Node and currently is deployed using an AWS EC2 instance.

Some features/functionality includes:
- Trending Topics
- Lazy loading of Tweets

Currently live on https://connorbyers.codes

## Instructions to run

To run this program:
1. run `npm install`
2. `cd ./server` and `npm install`
3. Add .env files
4. In the main directory, run `npm run dev` which will run both the frontend and backend

## Environment variables

In the main directory `/.env`:

|Name                        | Value|
|--------------------------- | ---- |
|REACT_APP_RESTAPI_ENDPOINT  | Endpoint that the restapi is running on, the default is http://localhost:5000|
|PORT                        | Port which you want the frontend to run on|

In `./server/.env`

|Name                        | Value |
| -------------------------- | ------ |
|AWS_ACCESS_KEY_ID           | Needed for Amazon s3. Find value on your AWS account|
|AWS_SECRET_ACCESS_KEY       | Needed for Amazon s3. Find value on your AWS account|
|BUCKET_NAME                 | Needed for Amazon s3. Find value on your AWS account|
|NODE_ENV                    | development|

## Next Steps

- Error handling needs to be improved. Currently only create an alert() when, for example, a login fails, which is not optimal.
- An ability to "Like" a Tweet
- The ability to see another person's tweets or profile
- The ability to "retweet" and have that appear on your profile's tweets
