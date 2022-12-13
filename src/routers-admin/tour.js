const { verifyAdmin } = require('../verify')
const { search } = require('./auth')
const auth = require('../controller-admin/tour/auth')
const { bestSeller } = require('../controller-admin/tour/bestSeller')
const show = require('../controller-admin/tour/show')
const { tourDetail } = require('../controller/tour/tourDetail');

const tour = require('express')()

tour.get('/show/:id', tourDetail)
tour.put('/auth', verifyAdmin, auth)
tour.get('/bestseller', bestSeller)
tour.get('/search', search)
tour.get('/show', show)

module.exports = {
    tour
};
