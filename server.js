require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')

const route = require('./app/routers/index')

app.use(express.urlencoded({ extended: false }))
// parse app JSON
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/v1', route)

app.use('/image', express.static('./images'))

app.use('*', (req, res, next) => {
  const error = new Error('ERROR.........')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500
  }
  res.json({
    message: err.message,
    status_error: err.status
  })
})

app.listen(port, () => {
  console.log('Server berjalan di port ' + port)
})


