import express from 'express';
import users from '../services/users'
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(users.getAll(req.query.page));
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

module.exports = router;