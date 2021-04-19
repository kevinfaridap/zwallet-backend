const connection = require('../configs/db')

const user = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getUserById: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id= ?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // Ganti dengan finduser
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(email) as countEmail FROM users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  findUserTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },


  updateUser: (idUser, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id=?', [data, idUser], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteUser: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id=?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = user
