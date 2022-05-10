import sqlite from 'better-sqlite3';
import path from 'path';

const db = new sqlite('./api/database/tec_dash.sqlite3');

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
    return db.prepare(sql).run(params);
}

function exec(sql) {
    db.exec(sql)
}

function query_no_params(sql) {
    return db.prepare(sql).all();
}

module.exports = {
  query,
  run,
  exec,
  query_no_params
}