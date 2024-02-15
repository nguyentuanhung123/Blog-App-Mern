const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const port = 4000;

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

//connect mongoose database after creating User.js on models api
mongoose.connect('mongodb+srv://nguyentuanhung4529871036:nguyentuanhung123@blogappmern.mpyl34q.mongodb.net/')

app.get('/test', (req, res) => {
  res.json('Test OK 2!')
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }
})

//nguyentuanhung123
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})