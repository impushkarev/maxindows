const {Router} = require ('express')
const appr = Router()

const App = require('../models/App')

appr.get('/', async (req, res, next) => {
  try {
    const apps = await App.find({})

    res.json({apps: apps})
  }
  catch (e) {
    error()
  }
})

// ДОБАВИТЬ ПРИЛОЖЕНИЕ

/*
router.get('/create', async (req, res, next) => {
  try {
    const app = new App({icon: 'https://psv4.userapi.com/c856416/u177332655/docs/d14/afa4c5e088eb/pixil-frame-0_10.png?extra=uu-tzkkPEh7izeqRxzkrOqeShuclvYFdaCEmPQQ22RVYIeNkrD0juBHiiktAMv4dOtyLWL8N14sodtjxgmzBfm4UDSKYG_7I565YHLuG0cUSjG85WkLAEt5xw5DXyFgBRrPigIG6n9qbyjhHNTWZ2KUwLw',
                          app: 'Text Editor',
                          name: 'NOT EDITABLE'})

    app.save()

    res.status(201).json({message: 'Приложение создано'})
  }
  catch (e) {
    error()
  }
})
*/

const error = () => {res.status(500).json({message: 'Server Error', isError: true})}

module.exports = appr