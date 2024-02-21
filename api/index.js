const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'vbwHV873GFB1cvaeve';

app.use(cors({
  credentials: true, 
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());


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

app.post('/login', async (req, res) => {
  const {username, password} = req.body; 
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if(passOk){
    //logged in (npm i jsonwebtoken)
    jwt.sign({username: userDoc.username, id: userDoc._id}, secret, {}, (err, token) => {
      if(err) throw err;
      //res.cookie('token', token).json('ok');
      res.cookie('token', token).json({
        id: userDoc._id,
        username: userDoc.username
      });
    });
    //res.json()
  }else{
    res.status(400).json('wrong credentials')
  }
})

// ta đang vẫn đang lưu giữ token ở browser khi ta đã đăng nhập và refresh browser
// tải thêm cookie-parser
// Lần đầu đăng nhập sẽ chỉ có Set-Cookie ở response , nhưng ở từ lần thứ 2 trở đi sẽ có request cookie
// Ở lần đầu khi đăng nhập và chuyển trang đến IndexPage thì không có request Cookie nên ở Header không có username
// Khi ta refresh nó mới gửi mới có cookie ở request nên Header mới có username
app.get('/profile', async (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if(err) throw err;
    res.json(info);
  })
  //res.json(req.cookies);
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
})

//nguyentuanhung123
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})