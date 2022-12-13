const { verifyUser } = require('../verify')
const { addBooking } = require('../controller/booking/add')
const { cancelTour } = require('../controller/booking/cancel')
const { show } = require('../controller/booking/show')
const booking = require('express')()

booking.post('/add', verifyUser, addBooking)
booking.get('/show', verifyUser, show)
booking.delete('/cancel', verifyUser, cancelTour)

module.exports = {
    booking
};

