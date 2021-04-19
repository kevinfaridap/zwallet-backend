const express = require('express')
const route = express.Router()

const routeUsers = require('./users');
const routeTransactions = require('./transaction');

route.use('/users', routeUsers)
route.use('/transaction', routeTransactions)


module.exports = route
