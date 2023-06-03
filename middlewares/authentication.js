const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../database/connect');
module.exports = (req, res, next) => {
    // get token from cookie
    const token = req.session.token;
    if (!token) {
        return res.redirect('/');
    }
    // verify token
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }
        // set user info
        const id = decoded.id;
        const getIdSql = `SELECT * FROM users WHERE id = ?`;
        const getIdQuery = new Promise((resolve, reject) => {
            db.query(getIdSql, [id], (err, result) => {
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
        if (!getIdQuery) {
            return res.redirect('/');
        }
        req.user = getIdQuery;
        next();
    });
}
