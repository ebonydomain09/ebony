const express = require('express');
const router = express.Router();
const { getPazz, indexPage,refresh, } = require('../controllers/mass.controller')

const {auth } = require('../auth/auth')
const upload = require('../multer')

router.route('/').get(auth,refresh)
router.route('/home').get(auth,indexPage)
router.route('/contact-us').gey(auth,getPazz)

module.exports = router