const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/', require('./routes/router'))

const start = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    

    // app.use((req, res, next) => {
    //   res.send(process.env.DB)
    // })
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
  catch(e) {
    console.log(`Server Error ${e.message}`)
    process.exit(1)
  }
}

start()