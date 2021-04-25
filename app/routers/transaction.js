const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactions')


router

//   .get('/', transactionController.getTransaction)
//   .get('/:id', transactionController.getTransactionById)
//   .post('/', transactionController.insertTransaction)
//   .put('/:id', transactionController.updateTransaction)
//   .delete('/:id', transactionController.deleteTransaction)
    
    // .get("/")
    .post("/topup", transactionController.createTopUp)
    .post("/transfer", transactionController.createTransfer)
    .get("/receiver/:idreceiver", transactionController.getReceiver)
    .get("/:id", transactionController.getTransactionById)
module.exports = router