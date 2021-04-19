const userModels = require('../models/users')
const helpers = require('../helpers/helper')
const hashPassword = require('../helpers/hashPassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getUser = (req, res) => {
  userModels.getUsers()
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getUserById = (req, res) => {
  const idUser = req.params.idUser
  userModels.getUserById(idUser)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${idUser}`,
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

exports.insertUser = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    idUser,
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.insertUser(data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

// hash passowrd
exports.registerUser = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body
    const result = await userModels.findUser(email)

    if (result.length !== 0) {
      return helpers.response(res, null, 200, { email: 'Email already exists' })
    }
    const data = {
      email,
      password: await hashPassword.hashPassword(password),
      firstName: '',
      lastName: '',
      phoneNumber,
      saldo: 10000,
      role: 2,
      active: false,
      image: '',
    }
    const resultInsert = await userModels.insertUser(data)

    return helpers.response(res, data, 401, null)
  } catch (error) {
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userModels.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 200, { message: 'Email or Password is not registered' })
    }
    const user = result[0];
    const isValid = await bcrypt.compare(password, user.password)
    // console.log(isValid);
    if (!isValid) {
      return helpers.response(res, null, 200, { message: 'Email or Password is incorrect' })
    }
    delete user.password

    // Cek email
    const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
      user.token = token
      return helpers.response(res, user, 200, null)
    })
  } catch (error) {
   
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

exports.updateUser = (req, res) => {
  const idUser = req.params.idUser
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.updateUser(idUser, data)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Succes update data',
          status: 200,
          data: data
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteUser = (req, res) => {
  const idUser = req.params.idUser
  userModels.deleteUser(idUser)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Succes delete id: ${idUser}`,
          status: 200
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
