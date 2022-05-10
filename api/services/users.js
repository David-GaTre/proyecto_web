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

function update(id, name, email, bday, pass) {
  const data = db.run(`UPDATE users 
                        SET name = ?, email = ?, birth_day = ?, password = ?
                        WHERE id = ?`,[name, email, bday, pass, id]);
  return { data }
}

function deleteById(id) {
  const data = db.query(`DELETE FROM users WHERE id = ?`, [id]);
  return { data }
}

function getById(id) {
  const data = db.query(`SELECT * FROM users WHERE id = ?`, [id]);
  return { data }
}

module.exports = {
  createTable,
  getAll,
  create,
  update,
  deleteById,
  getById
}