var express = require('express');
var passwordless = require('passwordless');
var Account = require('../models/account');
var router = express.Router();


/* GET home page. */
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


var users = [
  { id: 1, email: 'sinisa.mikulic@gmail.com', savingsData: {} },
  { id: 2, email: 'frut3k@hotmail.com', savingsData: {} }
];

/* POST login screen. */
router.post('/sendtoken', 
  passwordless.requestToken(
    // Simply accept every user
    function(user, delivery, callback) {
      
      for (var i = users.length - 1; i >= 0; i--) {
        if(users[i].email === user.toLowerCase()) {
            return callback(null, users[i].email);
        }
      }
      callback(null, null);
    }),
    function(req, res) {
      // Success!
      res.render('sent');
});


/**
 * Deliver user data
*/
router.get('/getuser', function(req, res) {
  return res.send(req.user || null);
});


module.exports = router;
