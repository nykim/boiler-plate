const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/keys')
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!!! ajaja')
})

app.post('/api/users/register', (req, res) => {
  // get User registration info from the client, then put into DB
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => {

  // find email from db
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "No username/email found"
      })
    }

    // check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "Incorrect Password."})
      
        // generate token
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // store token (cookie, local storage, etc...)
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ logicSuccess: true, userId: user._id})
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id},
    {token: ""},
    (err, user) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
