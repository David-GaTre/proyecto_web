import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import tables from './api/database/create_tables'

import userRouter from './api/routes/users.routes'

const app = express();
tables.createAllTables();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/users', userRouter);

// Rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Example app listening on port'+ app.get('port'));
});
