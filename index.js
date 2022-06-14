import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import tables from './api/database/create_tables';
import cookieParser from 'cookie-parser';
import sessions from 'express-session'

import userRouter from './api/routes/users.routes'
import ticketRouter from './api/routes/tickets.routes'

const app = express();
tables.createAllTables();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "secretkey",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());

var session;

app.set('view engine', 'ejs');

// Rutas API
app.use('/users', userRouter);
app.use('/tickets', ticketRouter)

// Rutas
app.use(express.static(__dirname + '/views'));
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  console.log(req.session);
  res.clearCookie("user_id");
  res.redirect('/');
});

app.get('/profile', (req, res) => {
  console.log(req.session);
  session=req.session;
  if(session.user_id && req.cookies['user_id']){
    res.render('pages/profile');
  } else {
    res.redirect('/');
  }
});

app.get('/ticket/new', (req, res) => {
  session=req.session;
  if(session.user_id && req.cookies['user_id']){
    res.render('pages/ticket');
  } else {
    res.redirect('/');
  }
});

app.get('/ticket_view', (req, res) => {
  session=req.session;
  res.render('pages/ticketView');
  /*if(session.user_id && req.cookies['user_id']){
    res.render('pages/ticketView');
  } else {
    res.redirect('/');
  }*/
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Example app listening on port'+ app.get('port'));
});
