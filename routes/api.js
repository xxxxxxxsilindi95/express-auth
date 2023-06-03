const express = require('express');
const router = express.Router();
const db = require('../database/connect');
const login = require('../auth/login');
const register = require('../auth/register');

router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (!result.status) {
        return res.status(401).send(result);
    } 
    // set cookie
    req.session.token = result.token;
    return res.status(200).send(result);
});

router.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await register(username, password);
    if (!result.status) {
        return res.status(400).send(result)
    }
    // set cookie
    req.session.token = result.token;
    return res.status(200).send(result)
});

module.exports = router;