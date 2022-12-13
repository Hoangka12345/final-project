const { delFeedback } = require('../controller-admin/feedback/del')
const { delReply } = require('../controller-admin/feedback/delReply')

const feedback = require('express')()

feedback.delete('/delfeedback/:id', delFeedback)
feedback.delete('/delreply/:id', delReply)


module.exports = feedback