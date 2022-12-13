const home = require('../controller-company/multiple/home')
const { verifyCompany } = require('../verify')
const auth = require('./auth')
const { booking } = require('./booking')
const tour = require('./tour')
const company = require('express')()

company.get('/', verifyCompany, home)
company.use('/', auth)
company.use('/tour', tour)
company.use('/booking', booking)

module.exports = company