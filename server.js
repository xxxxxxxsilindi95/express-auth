const config = require('./config');
const express = require('express');
const path = require('path');
const app = express();
const port = config.port;
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const frontend = require('./routes/frontend');
const api = require('./routes/api');
const corsOptions = {
    methods: ['GET', 'POST'],
    origin: config.origin,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// session
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/', frontend);
app.use('/api', api);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});