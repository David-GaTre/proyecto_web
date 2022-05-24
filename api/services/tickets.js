import db from '../database/db'
import config from '../config'


function createTable() {
  db.exec(`
          CREATE TABLE IF NOT EXISTS tickets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expedited_by INTEGER NOT NULL,
          assigned_to INTEGER,
          title TEXT,
          favour_type TEXT,
          short_desc TEXT,
          instructions TEXT,
          price REAL, 
          tips REAL,
          completed INTEGER DEFAULT 0 NOT NULL)`)
}

function getAll() {
  const data = db.query_no_params(`SELECT * FROM tickets`);
  return { data }
}

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM tickets LIMIT ?,?`, [offset, config.listPerPage]);
  return { data }
}

function create(ticketObj) {
  const {expedited_by,title,favour_type,short_desc, instructions, price, tips} = ticketObj;
  const result = db.run(`
    INSERT INTO tickets (expedited_by,title,favour_type,short_desc, instructions, price, tips) VALUES 
    (@expedited_by,@title,@favour_type,@short_desc, @instructions, @price, @tips)`, {expedited_by,title,favour_type,short_desc, instructions, price, tips});
  let message = 'Error in creating ticket';
  if (result.changes) {
    message = 'Ticket created successfully';
  }

  return {message};
}

function update(ticketObj, ticketParams) {
  const {id} = ticketParams
  const {expedited_by, assigned_to, title, favour_type, short_desc, instructions, price, tips, completed} = ticketObj
  const data = db.run(`UPDATE tickets 
                        SET expedited_by = ?, assigned_to = ?, title = ?, favour_type = ?, short_desc = ?, instructions = ?, price = ?, tips = ?, completed = ?
                        WHERE id = ?`,[expedited_by, assigned_to, title, favour_type, short_desc, instructions, price, tips, completed, id]);
  return { data }
}

function completeTicket(ticketParams) {
  const {id} = ticketParams
  const data = db.run(`UPDATE tickets 
                        SET completed = 1
                        WHERE id = ?`,[id]);
  return { data }
}

function asignTicket(id, asignee_id) {
  const data = db.run(`UPDATE tickets 
                        SET assigned_to = ?
                        WHERE id = ?`,[asignee_id, id]);
  return { data }
}

function deleteById(id) {
  const data = db.query(`DELETE FROM tickets WHERE id = ?`, [id]);
  return { data }
}

function getById(ticketParams) {
  const {id} = ticketParams;
  const data = db.query(`SELECT * FROM tickets WHERE id = ?`, [id]);
  return { data }
}

module.exports = {  
  createTable,
  getAll,
  getMultiple,
  create,
  update,
  completeTicket,
  asignTicket,
  deleteById,
  getById
}