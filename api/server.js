const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const plantRouter = require('../plants/plants-router.js');
const twilioRouter = require('../twilio/twilio-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("Welcome to the Water My Plants API");
});

server.use('/api/users', usersRouter);
server.use('/api', authRouter);
server.use('/plants', plantRouter);
server.use('/twilio', twilioRouter); 

module.exports = server;