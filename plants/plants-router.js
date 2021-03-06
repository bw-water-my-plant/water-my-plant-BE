const express = require('express');
const router = express.Router();
const Plants = require('./plants-model.js');

const restricted = require('../auth/restricted.js');

router.get ('/', restricted, (req, res) => {
    Plants.find()
    .then(cohorts => {
      res.status(200).json(cohorts);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });
  
  router.get ('/:id', validatePlantId, (req, res) => {
    const id = req.params.id;
    Plants
    .findById(id)
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  });
  
  router.post('/', validatePlant, async (req, res) => {
    const cohortInfo = req.body;
      try {
        const savedPost = await Plants.add(cohortInfo);
        res.status(201).json(savedPost);
        } catch (err) {
          res.status(500).json({
          message: 'failed to save cohort', err: err.message
          });
        }
  });
  
  router.put('/:id', validatePlantId, validatePlant, async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    try {
      await Plants.update(id, changes);
      const updatedInfo = await Plants.findById(id);
      res.status(201).json(updatedInfo);
    } catch (err) {
      res.status(500).json({
          message: 'failed to update Plant info', err: err.message
      });
    }
  });
  
  router.delete('/:id', validatePlantId, async (req, res) => {
    const id = req.params.id;
    try {
      await Plants.remove(id);
      res.status(200).json({ message: `Plants Id: ${id} removed!` });
    } catch (err) {
      res.status(500).json({
      message: 'failed to delete post', err: err.message
      });
    }
  });

// custom middleware

async function validatePlantId(req, res, next) {
  try {
      const { id } = req.params;
      const cohort = await Planss.findById(id);
      if (cohort) {
          req.cohort = cohort;
          next();
      } else {
         res.status(404).json({ message: 'Plant not found: invalid id' }); 
      }
    } catch (err) {
        res.status(500).json({ message: 'Failed to process request'});
    }
};

function validatePlant(req, res, next) {
  try {
      const { name } = req.body;
      if (name) {
          req.name = name;
          next();
      } else {
         res.status(404).json({ message: 'Plant Name missing' }); 
      }
    } catch (err) {
        res.status(500).json({ message: 'Failed to process request'});
    }
};


module.exports = router;  