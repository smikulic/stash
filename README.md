# Stash app


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

Go to user root and run `sudo mkdir -p /data/db` to create default location where mongod process will write data,
and set read and write permissions to that directory

Start Mongo DB with `sudo mongod` and then

create file `node.config.js` in root directory and write
```
var _pw = "YOUR_EMAIL_CLIENT_PASSWORD";

module.exports = _pw;
```

start server with `gulp serve`

`Go to localhost:/9001`


## Commands
Start server: `gulp serve`
Start DB: `sudo mongod`


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

