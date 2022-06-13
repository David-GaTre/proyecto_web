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

router.get('/uncompleted', function(req, res, next) {
  try {
    res.json(tickets.getAllUncompleted(req));
  } catch(err) {
    console.error(`Error while getting tickets `, err.message);
    next(err);
  }
});

router.post('/', function(req, res, next) {
    try {
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


router.get('/asigned/:as_id', function(req, res, next) {
  try {
    res.json(tickets.countCompleted(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.get('/expedited/:exp_id', function(req, res, next) {
  try {
    res.json(tickets.countExpedited(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.get('/history/:user_id', function(req, res, next) {
  try {
    res.json(tickets.getUserRelatedTickets(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.get('/active/:user_id', function(req, res, next) {
  try {
    res.json(tickets.getUserActiveTickets(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/assign', function(req, res, next) {
  try {
    res.json(tickets.asignTicket(req.body));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/:id', function(req, res, next) {
  try {
    res.json(tickets.update(req.body, req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/:id/complete', function(req, res, next) {
  try {
    res.json(tickets.completeTicket(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});


module.exports = router;