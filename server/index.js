const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const http = require('http')
const https = require('https')
const fs = require('fs')

require('dotenv').config()

const app = express()
const [PORT, SPORT] = [process.env.PORT || 8080, process.env.PORT || 8443]
const credentials = { key: fs.readFileSync('./key.pem'), 
                      cert: fs.readFileSync('./certificate.crt')}

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
    
    const httpServer = http.createServer(app)
    const httpsServer = https.createServer(credentials, app)

    httpServer.listen(PORT)
    httpsServer.listen(SPORT)
  }
  catch(e) {
    console.log(`Server Error ${e.message}`)
    process.exit(1)
  }
}

start()