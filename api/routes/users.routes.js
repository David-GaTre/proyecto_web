import express from 'express';
import users from '../services/users';
import sessions from 'express-session';

const router = express.Router();
var session;

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
      res.json(users.create(req.body));
    } catch(err) {
      console.error(`Error while adding users `, err.message);
      next(err);
    }
});

router.get('/user_check/:user&:pass', function(req, res, next) {
  try {
    const res_data = users.getByEmailAndPass(req.params)
    if (res_data['data']) {
      session=req.session;
      session.user_id=res_data['data']['id'];
    }
    res.json(res_data);
  } catch(err) {
    console.error(`Error occured: `, err.message);
    next(err);
  }
});

router.put('/add_balance', function(req, res, next) {
  try {
    const res_data = res.json(users.addBalance(req.body));
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