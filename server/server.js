const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const tweets = require('./routes/tweets');
const users = require('./routes/users');

const app = express();

const MongoURI = 'mongodb+srv://BigUser98:D9j6h4bgh1@cluster0-phjyd.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(MongoURI,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex: true})
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

app.use(express.json());
app.use(cookieParser());

app.use('/api/tweets',tweets);
app.use('/api/users',users);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
});