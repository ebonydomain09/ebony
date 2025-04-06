const isbot = require('isbot');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const SECRET = process.env.JWT_SECRET
const axios = require('axios');


const auth = asyncHandler(async (req, res, next) => {
  const clientIP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', clientIP);
  //const ip = req.clientIp;
  const ip = '18.207.141.103';
  const bot = isbot(req.get('user-agent'))
  const token = req.query.toks

        //console.log(bot);
        async function check() {
          //await axios.get(`https://vpnapi.io/api/${ip}?key=f09d3736205f442c9cd2d2d2a14f47ed`).then((ans) => {
        
            //|| vpnApi[ip].vpn == 'yes' || vpnApi[ip].proxy === 'yes' 
                  if (bot || req.isSpider()) {
                    console.log('mov inside axios');
                    res.render('mov')
                  } else {
                    next()
                  }

        }
        check()

    

});

module.exports = { auth }