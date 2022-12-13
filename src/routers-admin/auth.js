const auth = require('express')()
const login = require('../controller-admin/auth/login')
const register = require('../controller-admin/auth/addAdmin')
const { verifyAdmin } = require('../verify')
const { uploadAvatar } = require('../uploads/uploadImage')
const { getAdmin } = require('../controller-admin/auth/getAdmin')
const { delAdmin } = require('../controller-admin/auth/delAdmin')
const { update } = require('../controller-admin/auth/update')


auth.post('/login', login)
auth.post('/register', verifyAdmin, uploadAvatar, register)
auth.put('/update', verifyAdmin, uploadAvatar, update)
auth.get('/getadmin', verifyAdmin, getAdmin)
auth.delete('/del', verifyAdmin, delAdmin)

module.exports = auth