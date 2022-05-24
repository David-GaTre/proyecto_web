import db from './db'
import config from '../config'
import users from '../services/users'
import tickets from '../services/tickets'


function createAllTables () {
    users.createTable();
    tickets.createTable();
}

module.exports = {createAllTables}
