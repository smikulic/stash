var express = require('express');
var passwordless = require('passwordless');
var User     = require('../models/user');
var mongoose = require('mongoose');
var router = express.Router();


/* GET route. */
router.get('/', function(req, res) {
  if (req.user) {
    res.render('../../../src/client/index.ejs', { user: req.user });
  } else {
    res.render('index', { user: req.user });  
  }
});
/* GET restricted site. */
router.get('/restricted', passwordless.restricted(), function(req, res) {
  res.render('restricted', { user: req.user });
});
/* GET login screen. */
router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});
/* GET logout. */
router.get('/logout', passwordless.logout(), function(req, res) {
  res.redirect('/');
});

/* POST login screen. */
router.post('/sendtoken', 
  passwordless.requestToken(
    // Simply accept every user
    function(user, delivery, callback) {
      // check if user already exists, if not, create a new one
      User.findOne({email: user}, function(err, user) {
        if (user) {
          console.log('User exists!')
          callback(null, user.id);
        } else {
          console.log('User non existing')
          //callback(null, null);
        }
      });
    }),
    function(req, res) {
      // Success!
      res.render('sent');
});


// USERS

/* POST create a user. */
router.post('/api/users', function(req,res) {
  console.log('POST: ', '/api/users');
      
  var user = new User();      // create a new instance of the User model
  user.email = req.body.email;  // set the user email (comes from the request)

  // save the user and check for errors
  user.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'User created!' });
  });     
});
/* GET all users. */
router.get('/api/users', function(req, res) {
  console.log('GET: ', '/api/users/');

  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});
/* GET user by email. */
router.get('/api/users/:user_id', function(req, res) {
  console.log('GET: ', '/api/users/:user_id');

  User.findOne({_id: req.params.user_id}, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
});


module.exports = router;
