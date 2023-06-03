const config = require('../config.json');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authentication');
router.get('/', (req, res) => {
    res.render('auth_login');
});

router.get("/dashboard", auth,async (req, res) => {
    return res.render('dashboard', { title: 'CheckNetwork - Dashboard', user: await req.user});
});

module.exports = router;        

