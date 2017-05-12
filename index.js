/*jshint esversion: 6*/

const session = require('express-session');
const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.envPORT || 3000;
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { user } = db;

//password hashing
const saltRounds = 10;
const bcrypt = require('bcrypt');

app.use(express.static('public'));

app.use(bodyParser.json({extended: true}));

//startup Session
app.use(session({
  store: new RedisStore(),
  secret: 'letTheRythemJust',
  resave: false,
  saveUninitialized: true
}));

//set up passport
app.use(passport.initialize());
app.use(passport.session());

//passport local strategy
passport.serializeUser(function(user, done) {
  console.log('serializing');
// ^ ---------- given from authentication strategy
  // building the object to serialize to save
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  // ^ ---------- given from serializeUser
  User.findOne({
    where: {
      id: user.id
    }
  }).then(user => {
    return done(null, user); // <------- inserts into the request object
  });
});

passport.use(new LocalStrategy (
  function(username, password, done) {
    console.log('runs before serializing');
    User.findOne({
      where: {
        name: username
      }
    })
    .then ( user => {
      if (user === null) {
        console.log('user failed');
        return done(null, false, {message: 'bad username'});
      }
      else {
        console.log(user, user.password);
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, {message: 'bad password'});
          }
        });
      }
    })
    .catch(err => {
      console.log('error: ', err);
    });
  }
));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/api',
  failureRedirect: '/user/new'
}));

app.use('/api', require('./api'));


app.listen(3000, () =>{
  console.log(`listening on port: ${PORT}`);
  db.sequelize.sync({forceSync: true});
});

