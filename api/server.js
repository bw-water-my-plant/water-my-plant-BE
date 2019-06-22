const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

const server = express();

const sessionConfig = {
  name: 'motorcitycode', // by default would be sid
  secret: 'Your secret phrase goes here...',
  resave: false, // if there are no changs to the session, no need to resave
  saveUninitialized:  true, // for GDPR compliance laws against setting cookies, change dynamically in prod
  cookie: {
    maxAge: 1000 * 60 * 10, // in milliseconds, this equals 10 minutes
    secure: false, // send cookie only over https,false in dev only, set to true in production
    httpOnly: true, // always set to true, it means client JS can't access the cookie. 
  },
  store: new KnexSessionStore({ // don't forget 'new' here
    knex: require('../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
  res.send("Welcome to the Water My Plants API");
});

server.use('/api/users', usersRouter);
server.use('/api', authRouter);

module.exports = server;