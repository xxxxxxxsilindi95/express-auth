const db = require('../database/connect');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function register(username, password) {
if (!username || !password) {
return { status: false, message: 'Username or password is missing' };
}
const con = db;
const sqlUserFind = `SELECT * FROM users WHERE username = ?`;
const valuesUserFind = [username];
const FinduserQuery = new Promise((resolve, reject) => {
con.query(sqlUserFind, valuesUserFind, (err, result) => {
if (err) {
reject(false);
} else {
    if (result.length > 0) {
        resolve(true);
    } else {
        resolve(false);
    }
}
});
});
const Finduser = await FinduserQuery;
if (Finduser) {
return { status: false, message: 'User already exists' };
}
const crypt = crypto.MD5(password).toString();
const sqlUserInsert = `INSERT INTO users (username, password) VALUES (?, ?)`;
const valuesUserInsert = [username, crypt];
const InsertuserQuery = new Promise((resolve, reject) => {
con.query(sqlUserInsert, valuesUserInsert, (err, result) => {
if (err) {
reject(false);
} else {
resolve(true);
}
});
});
const Insertuser = await InsertuserQuery;
if (Insertuser) {
const sqlUserFind = `SELECT * FROM users WHERE username = ?`;
const valuesUserFind = [username];
const FinduserQuery = new Promise((resolve, reject) => {
con.query(sqlUserFind, valuesUserFind, (err, result) => {
if (err) {
reject(false);
} else {
resolve(result[0]);
}
});
});
const Finduser = await FinduserQuery;
const token = jwt.sign({ id: Finduser.id }, config.jwtSecret, { expiresIn: '1h' });
return { status: true, message: 'User created', token: token };
} else {
return { status: false, message: 'User could not be created' };
}
}

module.exports = register;