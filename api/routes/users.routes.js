import express from 'express';
import users from '../services/users'
const router = express.Router();

router.get('/', function(req, res, next) {
  try {
    res.json(users.getAll(req));
  } catch(err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/', function(req, res, next) {
    try {
      console.log(req.body)  
      res.json(users.create(req.body));
    } catch(err) {
      console.error(`Error while adding users `, err.message);
      next(err);
    }
});

router.get('/user_check/:user&:pass', function(req, res, next) {
  try {
    res.json(users.getByEmailAndPass(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.get('/user_check/:id', function(req, res, next) {
  try {
    res.json(users.getById(req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/:id', function(req, res, next) {
  try {
    res.json(users.getById(req.body, req.params));
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});


module.exports = router;