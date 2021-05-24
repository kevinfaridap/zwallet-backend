const { query } = require('express')
const connection = require('../configs/db')

exports.createTopup = (data, idUser) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO transactions SET ?",
            [data],
            (err, result) => {
                console.log("error = " + err);
                if (!err) {
                    connection.query(
                        `SELECT amount from transactions WHERE idUser = ${idUser} ORDER BY createdAt DESC LIMIT 1`,
                        (err, result) => {
                            console.log("error = "  + err);
                            if (!err) {
                                connection.query(
                                    `UPDATE users SET saldo =(saldo + ${result[0].amount}) WHERE id = ${idUser}`,
                                    (err, result) => {
                                        if (!err) {
                                            resolve(result);
                                        } else {
                                            reject(new Error("Internal server error"));
                                        }
                                    }
                                )
                            } else {
                                reject(new Error("Internal server error"));
                            }
                        }
                    )
                } else {
                    reject(new Error("Internal server error"));
                }
            }
        )
    })
}

exports.checkCredit = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT saldo from users WHERE id = ${id}`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error("Internal server error"));
                }
            }
        )
    })
}

exports.createTransaction = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO transactions SET ?",
            [data],
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error("Internal server error"));
                }
            }
        )
    })
}

exports.checkPin = (id, pin) => {
    return new Promise((resolve, reject) => {
        connection.query(
            ` select pin from users where id=${id} and pin=${pin}`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            }
        );
    });
};

exports.transferIdUser = (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT amount from transactions WHERE idUser = ${idUser} ORDER BY createdAt DESC LIMIT 1`,
            (err, result) => {
                if (!err) {
                    connection.query(
                        `UPDATE users SET saldo =(saldo - ${result[0].amount}) WHERE id = ${idUser}`,
                        (err, result) => {
                            if (!err) {
                                connection.query(
                                    `SELECT saldo from users WHERE id = ${idUser}`,
                                    (err, result) => {
                                        if (!err) {
                                            connection.query(
                                                `UPDATE transactions SET saldoLeft =${result[0].saldo}, status="success"  WHERE idUser =${idUser} ORDER BY createdAt DESC LIMIT 1 `,
                                                (err, result) => {
                                                    if (!err) {
                                                        resolve(result);
                                                    } else {
                                                        reject(new Error("Internal server error"));
                                                    }
                                                }
                                            )
                                        } else {
                                            reject(new Error("Internal server error"));
                                        }
                                    }
                                )
                            } else {
                                reject(new Error("Internal server error"));
                            }
                        }
                    )
                } else {
                    reject(new Error("Internal server error"));
                }
            })
    })
}


exports.receiverTransfer = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT amount from transactions WHERE idReceiver = ${id} ORDER BY createdAt DESC LIMIT 1`,
            (err, result) => {
                if (!err) {
                    connection.query(
                        `UPDATE users SET saldo =(saldo + ${result[0].amount}) WHERE id = ${id}`,
                        (err, result) => {
                            if (!err) {
                                resolve(result);
                            } else {
                                reject(new Error("Internal server error"));
                            }
                        }
                    )
                } else {
                    reject(new Error("Internal server error"));
                }
            })
    })
}



exports.getTransactionsById = (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM transactions WHERE id= ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }


  
  exports.getReceivers = (idreceiver) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT firstName, phoneNumber, image FROM users WHERE id = ${idreceiver}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }


//   SELECT * FROM `transactions` WHERE idUser=11 ORDER BY `transactions`.`createdAt` DESC LIMIT 0,4
  exports.getTransactions = (idsender) => {
    return new Promise((resolve, reject) => {
        // `SELECT transactions.id, transactions.idUser, transactions.idReceiver, transactions.amount, transactions.createdAt, transactions.type, users.firstName, users.phoneNumber FROM transactions INNER JOIN users ON transactions.idReceiver = users.id WHERE transactions.idUser = 48 ORDER BY transactions.createdAt DESC LIMIT 0,4`
        // connection.query(`SELECT * FROM transactions WHERE idUser = ${idsender} ORDER BY createdAt DESC LIMIT 0,4`, (err, result) => {
            connection.query(`SELECT transactions.id, transactions.idUser, transactions.idReceiver, transactions.amount, transactions.createdAt, transactions.type, users.firstName, users.phoneNumber, users.image FROM transactions INNER JOIN users ON transactions.idReceiver = users.id WHERE transactions.idUser = ${idsender} ORDER BY transactions.createdAt DESC LIMIT 0,4`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }


// const transaction = {


//   getTransactions: () => {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT * FROM transactions', (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   getTransactionById: (id) => {
//     return new Promise((resolve, reject) => {
//       connection.query('SELECT * FROM transactions WHERE id=?', id, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   insertTransactions: (data) => {
//     return new Promise((resolve, reject) => {
//       connection.query('INSERT INTO transactions SET?', data, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   deleteTransactions: (id) => {
//     return new Promise((resolve, reject) => {
//       connection.query('DELETE FROM transactions WHERE id=?', id, (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   },

//   updateTransactions: (id, data) => {
//     return new Promise((resolve, reject) => {
//       connection.query('UPDATE transactions SET ? WHERE id=?', [data, id], (err, result) => {
//         if (!err) {
//           resolve(result)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   }
// }

// module.exports = transaction
