# ScroogeVault app

[![bitHound Code](https://www.bithound.io/github/smikulic/stash/badges/code.svg)](https://www.bithound.io/github/smikulic/stash)
[![bitHound Overall Score](https://www.bithound.io/github/smikulic/stash/badges/score.svg)](https://www.bithound.io/github/smikulic/stash)
[![bitHound Dependencies](https://www.bithound.io/github/smikulic/stash/badges/dependencies.svg)](https://www.bithound.io/github/smikulic/stash/master/dependencies/npm)

## Stack:
- ES6
- React.js (.jsx) / Flux
- Gulp.js
- Node.js
- Express.js
- MongoDB / Moongoose


## Install
`git clone git@github.com:smikulic/stash.git`

`sudo npm install`

`sudo npm install gulp -g`

`brew install mongodb`

Setup heroku https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

Go to user root and run `sudo mkdir -p /data/db` to create default location where mongod process will write data,
and set read and write permissions to that directory

Start Mongo DB with `sudo mongod` and then

create file `.env` in root directory and write
`email_pw=YOUR_EMAIL_PASSWORD`

start server with `heroku local web`

Go to `localhost:5000/`

ALTERNATIVE: run `gulp serve` if you don't wanna setup heroku

## Deployment
Deployment to Heroku is done automatically on push to master. It will run build process with Gulp on production with some
changes to the environment variables (such as port to run on, production domain for email signup and MongoLab database).
Useful tips: https://devcenter.heroku.com/articles/getting-started-with-nodejs


## Commands
Start server: `gulp serve` or `heroku local web`
Start DB: `sudo mongod`
Login to production: `heroku login`
Log production server: `heroku logs -t`
Production manual deploy: `git push heroku master`
Production bash: `heroku run bash`
Production config vars: `heroku config`


## Package explanation
<strong>express</strong> for running node.js/express.js server (API requests, DB communication, etc.)

<strong>body-parser</strong> for parsing JSON files on server side

<strong>ejs</strong> for handling index.ejs file in node server (easier to render ejs template rather than html file)

<strong>uuid</strong> for creating random ID numbers (ie. react dispatcher events, key values etc.)

<strong>keymirror</strong> for mapping events in react throught constants

<strong>lodash</strong> for handling complex js functions, like mapping etc.

<strong>moment</strong> for handling date and time features

<strong>object-assign</strong> for assigning new functions to object (used in react Stores)


## These are used for login/auth
express-session

cookie-parser

jade

mongoose

morgan

passport

passport-local 

passport-local-mongoose

debug 

