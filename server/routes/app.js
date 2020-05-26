const {Router} = require ('express')
const bodyParser = require("body-parser")
const appr = Router()

const App = require('../models/App')
const AppData = require('../models/AppData')

appr.use(bodyParser.json())

// ПОЛУЧИТЬ ПРИЛОЖЕНИЯ
appr.get('/', async (req, res, next) => {
  try {
    const apps = await App.find({})

    res.json({apps: apps})
  }
  catch (e) {
    error(res, e)
  }
})
// ДОБАВИТЬ ПРИЛОЖЕНИЕ
appr.post('/create', async (req, res, next) => {
  try {
    const data = req.body
    const app = await new App({
      icon: data.icon,
      app: data.app,
      name: data.name
    })
    await app.save()

    res.json(app)
  } 
  catch (e) {
    error(res, e)
  }
})
// ИЗМЕНИТЬ ПРИЛОЖЕНИЕ
appr.put('/edit/:id', async (req, res, next) => {
  try {
    const data = req.body
    const app = await App.findById(req.params.id)

    if (data.icon !== undefined)
      app.icon = data.icon
    if (data.name !== undefined)
      app.name = data.name

    app.save()

    res.json(app)
  }
  catch (e) {
    error(res, e)
  }
})
// УДАЛИТЬ ПРИЛОЖЕНИЕ
appr.delete('/delete/:id', async (req, res, next) => {
  try {
    const app = await App.findByIdAndDelete(req.params.id)

    res.json(app)
  }
  catch (e) {
    error(res, e)
  }
})

const error = (res, e) => {res.status(500).json({message: 'Server Error', isError: true, error: e})}

module.exports = appr