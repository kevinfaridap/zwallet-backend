const transactionModels = require('../models/transaction')
const userModels = require('../models/users')
const helper = require('../helpers/helper')

exports.createTopUp = async (req, res) => {
    const { idUser, amount, info } = req.body;
    const data = {
        idUser,
        idReceiver: idUser,
        amount,
        type: "topup",
        info,
        status: "success"
    };
    transactionModels.createTopup(data, idUser)
        .then((result) => {
            return helper.response( res, {message: `Success Top Up = Rp ${amount}`}, 200, null );
        })
        .catch((err) => {
            return helper.response(res, null, 500, { message: err.message });
        });
};


exports.createTransfer = async (req, res) => {
    const { idUser, idReceiver, amount, info, pin } = req.body;
    const data = {
        idUser,
        idReceiver,
        amount,
        type: "transfer",
        info,
        status: "pending"
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
            helper.response( res, {message: `"Success transfer to ${idReceiver} sebesar ${amount}"`}, 200, null);
        }
    } catch (err) {
        console.log(err);
        helper.response(res, null, 200, { message: "erorr"});
    }
};


