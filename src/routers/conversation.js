const { addMessage } = require('../controller/conversation/add');
const { verify } = require('../verify');
const { getUserConnect } = require('../controller/conversation/getUserConnected');

const conversation = require('express')()

conversation.post('/add', verify, addMessage)
conversation.get('/getuser', verify, getUserConnect)

module.exports = {
    conversation
};
