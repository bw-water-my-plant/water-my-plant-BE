const express = require('express');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted.js');

const router = express.Router();
const bcrypt = require('bcryptjs');

//restricted,

router.get('/',  (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
        res
        .status(400)
        .json({message: 'Restricted!', err: err.message });
    });
});

router.get ('/:id', restricted, validateUserId, (req, res) => {
  const id = req.params.id;
  Users
  .findById(id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res
    .status(400)
    .json({message: 'Restricted!', err: err.message });
  })
});

router.put('/:id', restricted, validateUserId, async (req, res) => {
  const id = req.params.id;
  let user = req.body;
  // hash the password FIRST
  const hashed = bcrypt.hashSync(user.password, 10); 
  user.password = hashed;
  
  try {
    await Users.update(id, user);
    const updatedInfo = await Users.findById(id);
    res.status(201).json(updatedInfo);
  } catch (err) {
    res.status(500).json({
        message: 'failed to update User info', err: err.message
    });
  }
});

router.delete('/:id', restricted, validateUserId, async (req, res) => {
  const id = req.params.id;
  try {
    await Users.remove(id);
    res.status(200).json({ message: `User Id: ${id} removed!` });
  } catch (err) {
    res.status(500).json({
    message: 'failed to delete post', err: err.message
    });
  }
});

// custom middleware

async function validateUserId(req, res, next) {
try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user) {
        req.user = user;
        next();
    } else {
       res.status(404).json({ message: 'User not found: invalid id' }); 
    }
  } catch (err) {
      res.status(500).json({ message: 'Failed to process request'});
  }
};

function validateUser(req, res, next) {
try {
    const { phone, password } = req.body;
    if (phone && password) {
  
        next();
    } else {
       res.status(404).json({ message: 'Phone  or password missing' }); 
    }
  } catch (err) {
      res.status(500).json({ message: 'Failed to process request'});
  }
};


module.exports = router;