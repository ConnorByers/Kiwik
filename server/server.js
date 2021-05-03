const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const tweets = require('./routes/tweets');
const users = require('./routes/users');

const app = express();

const {MongoURI} = require('./secrets');

mongoose.connect(MongoURI,{useNewUrlParser:true, useUnifiedTopology:false,useCreateIndex: true})
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

const whitelist = ['http://localhost:3000', 'https://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/tweets',tweets);
app.use('/api/users',users);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
});