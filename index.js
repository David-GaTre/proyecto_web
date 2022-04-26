import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import AppDAO from './database/dao';
import UserRepository from './database/user_repository';

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Database example
const dao = new AppDAO('./database/database.sqlite3')
const userRepo = new UserRepository(dao)

userRepo.createTable()
//  .then(() => userRepo.create("David Garcia")) Run this to create a user called whatever
//  .then(() => userRepo.getById(1));

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});