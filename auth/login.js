const db = require('../database/connect');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config');
async function login(username, password) {
if (!username || !password) {
return { status: false, message: 'Username or password is missing' };  
}
const con = db;
const sqlUserFind = `SELECT * FROM users WHERE username = ? AND password = ?`;
const arguments = [username, crypto.MD5(password).toString()];
const FinduserQuery = new Promise((resolve, reject) => {
con.query(sqlUserFind, arguments, (err, result) => {
if (err) {
reject(false);
} else {
if (result.length > 0) {
resolve(result[0]);
} else {
resolve(false);
}
}
});
});
const Finduser = await FinduserQuery;
if (!Finduser) {
return { status: false, message: 'Username or password is incorrect' };
}
const token = jwt.sign({ id: Finduser.id }, config.jwtSecret, { expiresIn: '1h' });
return { status: true, message: 'User logged in', token: token };

}
module.exports = login;
