const express = require('express')
const path = require('path')
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

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '/../', 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/../', 'client', 'build', 'index.html'))
  })
}

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