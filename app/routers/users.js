const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const verifyrole = require('../middlewares/verifyrole')
const auth = require('../middlewares/auth')

router
  // .get('/', auth.verifyAccess, verifyrole.verify(), userController.getUser)
  .get('/', auth.verifyAccess, userController.getUser)
  
  // auth dan role dimatikan sementara untuk frontend
  // .get('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.getUserById)
  .get('/profile', auth.verifyAccess, userController.getProfile)
  .get('/:idUser',  userController.getUserById)

  .post('/', auth.verifyAccess, verifyrole.verify(), userController.insertUser)
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  
  // .post('/tryemail', userController.email)
  
  // auth dan role dimatikan sementara untuk front end
  // .put('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.updateUser)

  .put('/updatepin', userController.updatePin)
  .put('/changepassword', userController.updatePassword)
  // .put('/:idUser', userController.updateUser)

  .delete('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.deleteUser)

module.exports = router
