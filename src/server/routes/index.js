var express = require('express');
var passwordless = require('passwordless');
var User = require('../models/user');
var Goal = require('../models/goal');
var Income = require('../models/income');
var mongoose = require('mongoose');
var router = express.Router();



/**
 * DEFAULT ROUTES
 */

/* GET route. */
router.get('/', function(req, res) {
  if (req.user) {
    res.render('../../../src/client/index.ejs', { user: req.user, server_env: process.env.environment });
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
      User.findOne({email: user}, function(err, existingUser) {
        if (existingUser) {
          callback(null, existingUser.id);
        } else {
          var newUser = new User();      // create a new instance of the User model
          newUser.email = user;  // set the user email (comes from the request)

          // save the user
          newUser.save();

          User.findOne({email: user}, function(err, existingUser) {
            if (existingUser) {
              callback(null, existingUser.id);
            } else {
              console.log("still no user?")
            }
          });
          //callback(null, null);
        }
      });
    }),
    function(req, res) {
      // Success!
      res.render('sent');
});



/**
 * USER ROUTES
 */

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


/**
 * GOAL ROUTES
 */

/* POST create a goal for user. */
router.post('/api/createGoal', function(req,res) {
  console.log('POST: ', '/api/createGoal');

  var goal = new Goal();      // create a new instance of the Goal model
  goal.userId = req.body.userId;  // set the goal user id (comes from the request)
  goal.title = req.body.title;
  goal.value = req.body.value;
  goal.saved = req.body.saved;
  goal.due = req.body.due;

  // save the goal and check for errors
  goal.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Goal created!' });
  });
});
/* GET all goals from user. */
router.get('/api/goals/:user_id', function(req, res) {
  console.log('GET: ', '/api/goals/:user_id');

  Goal.find({userId: req.params.user_id}, function(err, userGoals) {
    if (err)
      res.send(err);

    res.json(userGoals);
  });
});


/**
 * INCOME ROUTES
 */

 /* POST create an income for user. */
router.post('/api/createIncome', function(req,res) {
  console.log('POST: ', '/api/createIncome');

  var income = new Income();      // create a new instance of the Income model
  income.userId = req.body.userId;  // set the income user id (comes from the request)
  income.title = req.body.title;
  income.value = req.body.value;
  income.currency = req.body.currency;
  income.entryTime = req.body.entryTime;

  // save the income and check for errors
  income.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Income created!' });
  });
});
 /* DELETE remove an income. */
router.delete('/api/removeIncome/:income_id', function(req,res) {
  console.log('DELETE: ', '/api/removeIncome/:income_id');

  // remove the income and check for errors
  Income.remove({ _id: req.params.income_id }).remove(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Income removed!' });
  });
});
/* GET all incomes from user. */
router.get('/api/incomes/:user_id', function(req, res) {
  console.log('GET: ', '/api/incomes/:user_id');

  Income.find({userId: req.params.user_id}, function(err, userIncomes) {
    if (err)
      res.send(err);

    res.json(userIncomes);
  });
});


module.exports = router;
