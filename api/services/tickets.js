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
  try {
    db.exec("ALTER TABLE tickets ADD COLUMN canceled integer DEFAULT 0;")
  } catch(e) {
    console.log('Already created the column')
  }

  try {
    db.exec("ALTER TABLE tickets ADD COLUMN start_loc TEXT;")
    db.exec("ALTER TABLE tickets ADD COLUMN end_loc TEXT;")
  } catch(e) {
    console.log('Already created the location columns')
  }
}

function getAll() {
  const data = db.query_no_params(`SELECT * FROM tickets`);
  return { data }
}

function getAllUncompleted(ticketParams) {
  const {user_id} = ticketParams
  const data = db.query(`SELECT * FROM tickets WHERE completed = 0 and canceled = 0 and assigned_to is null and expedited_by != ?`, [user_id]);
  return { data }
}

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM tickets LIMIT ?,?`, [offset, config.listPerPage]);
  return { data }
}

function create(ticketObj) {
  const {expedited_by,title,favour_type,short_desc, instructions, price, tips, start_loc, end_loc} = ticketObj;
  const result = db.run(`
    INSERT INTO tickets (expedited_by,title,favour_type,short_desc, instructions, price, tips, start_loc, end_loc) VALUES 
    (@expedited_by,@title,@favour_type,@short_desc, @instructions, @price, @tips, @start_loc, @end_loc)`, {expedited_by,title,favour_type,short_desc, instructions, price, tips, start_loc, end_loc});
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
  const data_ticket = db.query(`SELECT * FROM tickets WHERE id = ?`, [id]);
  const user_expedited = db.query(`SELECT * FROM users WHERE id = ?`, [data_ticket[0].expedited_by]);
  const user_assigned = db.query(`SELECT * FROM users WHERE id = ?`, [data_ticket[0].assigned_to]);
  const balance_to_change = data_ticket[0].price + data_ticket[0].tips

  const data_expedited = db.run(`UPDATE users 
                                SET balance = balance - ?
                                WHERE id = ?`,[balance_to_change, user_expedited[0].id]);

  const data_assigned = db.run(`UPDATE users 
                                SET balance = balance + ?
                                WHERE id = ?`,[balance_to_change, user_assigned[0].id]);
  return { data }
}

function cancelTicket(ticketParams) {
  const {id} = ticketParams
  const data = db.run(`UPDATE tickets 
                        SET canceled = 1
                        WHERE id = ?`,[id]);
  
  return { data }
}

function unasignTicket(id, asignee_id) {
  const data = db.run(`UPDATE tickets 
                        SET assigned_to = null
                        WHERE id = ?`,[asignee_id, id]);
  return { data }
}

function asignTicket(ticketObj) {
  const {asignee_id,ticket_id} = ticketObj
  
  const data = db.run(`UPDATE tickets 
                        SET assigned_to = ?
                        WHERE id = ?`,[asignee_id, ticket_id]);
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

function countCompleted(ticketParams){
  const {as_id} = ticketParams;
  const num = db.query(`SELECT COUNT(*) as completed FROM tickets WHERE assigned_to = ? and completed = 1`, [as_id])
  return { num };
}

function countExpedited(ticketParams){
  const {exp_id} = ticketParams;
  const num = db.query(`SELECT COUNT(*) as expedited FROM tickets WHERE expedited_by = ?`, [exp_id])
  return { num };
}

function getUserRelatedTickets(ticketParams) {
  const {user_id} = ticketParams;
  const data = db.query(`SELECT * FROM tickets WHERE expedited_by = ? or assigned_to = ?`, [user_id, user_id]);
  return { data }
}

function getUserActiveTickets(ticketParams) {
  const {user_id} = ticketParams;
  const data = db.query(`SELECT * FROM tickets WHERE (expedited_by = ? or assigned_to = ?) and canceled = 0 and completed != 1`, [user_id, user_id]);
  return { data }
}

module.exports = {  
  createTable,
  getAll,
  getMultiple,
  create,
  update,
  completeTicket,
  unasignTicket,
  cancelTicket,
  asignTicket,
  deleteById,
  getById,
  getAllUncompleted,
  countCompleted,
  countExpedited,
  getUserRelatedTickets,
  getUserActiveTickets
}