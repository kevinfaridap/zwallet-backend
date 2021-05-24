const transactionModels = require('../models/transaction')
const userModels = require('../models/users')
const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
moment.locale('id');

exports.createTopUp = async (req, res) => {
    const { idUser, amount, info } = req.body;
    const data = {
        id: uuidv4(),
        idUser,
        idReceiver: idUser,
        amount,
        type: "Topup",
        info,
        status: "success"
    };
    transactionModels.createTopup(data, idUser)
        .then((result) => {
            return helper.response( res, data, 200, null );
        })
        .catch((err) => {
            return helper.response(res, null, 500, { message: err.message });
        });
};


exports.createTransfer = async (req, res) => {
    const { idUser, idReceiver, amount, info, pin } = req.body;
    const dateNow = new Date()
    const dateFormated = moment(dateNow).format('LLL');;
    const data = {
        id: uuidv4(),
        idUser,
        idReceiver,
        amount,
        type: "Transfer",
        info,
        status: "pending",
        dateFormated: dateFormated
    };
    try {
        const user = await userModels.findUserTransaction(idReceiver)
        if (user < 1) {
            helpers.response(res, null, 200, { message: 'There is no user' })
            return;
        } else {
            const saldo = await transactionModels.checkCredit(idUser)
            if (saldo[0].saldo < amount) {
                helper.response(res, null, 200, { message: "Sorry, saldo is not enough. Go Top-up Now !" })
                return;
            }
            await transactionModels.createTransaction(data);
            const cekpin = await transactionModels.checkPin(idUser, pin)
            if (cekpin < 1) {
                helper.response(res, null, 200, { message: "Incorect pin, try again" })
                return;
            }
            await transactionModels.transferIdUser(idUser);
            await transactionModels.receiverTransfer(idReceiver);
            helper.response( res, data, 200, null);
            
            // const getNewestData = await transactionModels.getDataById(data.id)
            // if (getNewestData.length !== 0){
            // }
        }
    } catch (err) {
        console.log(err);
        helper.response(res, null, 200, { message: "erorr"});
    }
};


exports.getTransactionById = (req, res) => {
    const idTransaction = req.params.id
    transactionModels.getTransactionsById(idTransaction)
      .then((result) => {
        if (result.length > 0) {
          res.json({
            message: `Succes get data id: ${idTransaction}`,
            status: 200,
            data: result
          })
        } else {
          res.json({
            message: 'Id not found !',
            status: 500
          })
        }
      })
  }


  exports.getReceiver = (req, res) => {
    const idreceiver = req.params.idreceiver
    transactionModels.getReceivers(idreceiver)
      .then((result) => {
        if (result.length > 0) {
          res.json({
            message: `Succes get data id: ${idreceiver}`,
            status: 200,
            data: result
          })
        } else {
          res.json({
            message: 'Id not found !',
            status: 500
          })
        }
      })
  }
  
  exports.getTransaction = (req, res) => {
    const idsender = req.params.idsender
    transactionModels.getTransactions(idsender)
      .then((result) => {
        if (result.length > 0) {
          res.json({
            message: `Succes get data id: ${idsender}`,
            status: 200,
            data: result
          })
        } else {
          res.json({
            message: 'Id not found !',
            status: 500
          })
        }
      })
  }


