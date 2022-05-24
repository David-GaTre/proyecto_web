import express from 'express';
import tickets from '../services/tickets'
const router = express.Router();

router.get('/', function(req, res, next) {
  try {
    res.json(tickets.getAll(req));
  } catch(err) {
    console.error(`Error while getting tickets `, err.message);
    next(err);
  }
});

router.post('/', function(req, res, next) {
    try {
      console.log(req.body)  
      res.json(tickets.create(req.body));
    } catch(err) {
      console.error(`Error while adding tickets `, err.message);
      next(err);
    }
});

router.get('/:id', function(req, res, next) {
  try {
    res.json(tickets.getById(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/:id', function(req, res, next) {
  try {
    res.json(tickets.getById(req.body, req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});


module.exports = router;