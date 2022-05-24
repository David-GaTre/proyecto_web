import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import tables from './api/database/create_tables';

import userRouter from './api/routes/users.routes'
import ticketRouter from './api/routes/tickets.routes'

const app = express();
tables.createAllTables();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Rutas API
app.use('/users', userRouter);
app.use('/tickets', ticketRouter)

// Rutas
app.use(express.static(__dirname + '/views'));
app.get('/', (req, res) => {
  res.render('pages/home');
});

app.get('/profile', (req, res) => {
  res.render('pages/profile');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Example app listening on port'+ app.get('port'));
});
