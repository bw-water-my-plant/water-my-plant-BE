const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
  let user = req.body;
  // hash the password FIRST
  const hash = bcrypt.hashSync(user.password, 8); // password gets re-hashed 2 ^ 8 times
  user.password = hash; // <<<<<<<<<<<<<<<<<<<
  // then save to db
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        req.session.username = user.username; // saves user to session
        res.status(200).json({ 
          message: `Welcome ${user.username}!`,
          token 
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if(err) {
        res.json({ message: "Cannot log you out"})
      } else {
        res.status(200).json({ message: 'You are logged out, thanks for visiting!'});
      }
    });
  } else {
    res.status(200).json({ message: "Not logged in"});
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
    // .. other data
  };

  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;