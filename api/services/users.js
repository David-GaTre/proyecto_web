import db from '../database/db'
import config from '../config'

function createTable() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          birth_day TEXT,
          password TEXT)`)
  try {
    db.exec("ALTER TABLE users ADD COLUMN balance REAL;")
  } catch(e) {
    console.log('Already created the column')
  }
}

function getAll() {
  // Podemos peronalizar queries de esta manera
  //const offset = (page - 1) * config.listPerPage;
  //const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, config.listPerPage]);
  const data = db.query_no_params(`SELECT * FROM users`);
  return { data }
}

function create(userObj) {
  const {name,email,birth_day,password} = userObj;
  console.log(userObj)
  const result = db.run(`INSERT INTO users (name,email,birth_day,password) VALUES (@name, @email, @birth_day, @password)`, {name, email, birth_day, password});
  let message = 'Error in creating user';
  if (result.changes) {
    message = 'User created successfully';
  }

  return {message};
}

function update(userObj, userParams) {
  const {id} = userParams
  const {name, email, bday, pass} = userObj
  const data = db.run(`UPDATE users 
                        SET name = ?, email = ?, birth_day = ?, password = ?
                        WHERE id = ?`,[name, email, bday, pass, id]);
  return { data }
}

function deleteById(id) {
  const data = db.query(`DELETE FROM users WHERE id = ?`, [id]);
  return { data }
}

function getById(userParams) {
  const {id} = userParams;
  const data = db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return { data }
}

function getByEmailAndPass(userParams) {
  const {user, pass} = userParams;
  const data = db.getOne(`SELECT * FROM users WHERE email = ? and password = ?`, [user, pass]);
  return { data }
}

module.exports = {
  createTable,
  getAll,
  create,
  update,
  deleteById,
  getById,
  getByEmailAndPass
}