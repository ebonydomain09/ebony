const express = require('express');
const bodyParser = require('body-parser')
const isbot = require('isbot');
const detector = require('spider-detector')
const session = require('express-session');
const nodeMailer = require('nodemailer')
const requestIp = require('request-ip');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5400

const app = express();
app.use(requestIp.mw())
app.use(detector.middleware())
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(session({
    secret: 'some super secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        //secure: true,
        httpOnly: true
    }
}))

app.use((req, res, next) => {
    // Set the X-Robots-Tag header to "noindex" to prevent indexing
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
});

const mass = require('./routes/mass.route')
app.use('/', mass)
app.listen(port, (req, res) => {
    console.log(`listening on ${port}`);
})