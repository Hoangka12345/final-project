const auth = require('express')()
const { uploadAvatar } = require('../uploads/uploadImage')
const { verifyCompany } = require('../verify')
const { getCompany } = require('../controller-company/auth/getCompanyUpdate')
const login = require('../controller-company/auth/login')
const register = require('../controller-company/auth/register')
const { show } = require('../controller-company/auth/showDetail')
const { update } = require('../controller-company/auth/update')

auth.post('/login', login)
auth.post('/register', uploadAvatar, register)
auth.get('/show', verifyCompany, show)
auth.put('/update', verifyCompany, uploadAvatar, update)
auth.get('/getinfo', verifyCompany, getCompany)

module.exports = auth