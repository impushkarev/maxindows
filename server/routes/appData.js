const {Router} = require ('express')
const bodyParser = require('body-parser')
const appdr = Router()

const App = require('../models/App')
const AppData = require('../models/AppData')

appdr.use(bodyParser.json())

//GET APP DATA
appdr.get('/:id', async (req, res, next) => {
  try {
    const appData = await AppData.findOne({file_id: req.params.id})
    res.json({appData: appData})
  }
  catch (e) {
    error(res)
  }
})
//EDIT APP DATA
appdr.put('/edit/:id', async (req, res, next) => {
  try {
    const appData = await AppData.findOne({file_id: req.params.id})

    appData.data.map((data) => {
      if (data.type === 'value')
        data.value = req.body.value
    })
    await appData.save()
    
  }
  catch (e) {
    error(res)
  }
})
// CREATE APP DATA
appdr.post('/create', async (req, res, next) => {
  try {
    const data = req.body
    
    const app = await App.findById(data.id)
    const appData = await new AppData({
      file_id: app._id,
      data: [
        {
          type: 'value',
          value: ''
        }
      ]
    })
    await appData.save()
    
    res.json(data)
  }
  catch (e) {
    error(res)
  }
})
// УДАЛИТЬ ДАННЫЕ ПРИЛОЖЕНИЯ
appdr.delete('/delete/:id', async (req, res, next) => {
  try {
    const appData = await AppData.findOneAndDelete({file_id: req.params.id})

    res.json(appData)
  } 
  catch (e) {
    error(res)
  }
})


const error = (res) => {res.status(500).json({message: 'Server Error', isError: true})}

module.exports = appdr