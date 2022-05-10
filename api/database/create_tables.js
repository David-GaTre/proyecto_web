import db from './db'
import config from '../config'
import users from '../services/users'


function createAllTables () {
    users.createTable();
}

module.exports = {createAllTables}
