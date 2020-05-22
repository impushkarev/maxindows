const {Router} = require ('express')
const bodyParser = require("body-parser")
const appdr = Router()

const App = require('../models/App')
const AppData = require('../models/AppData')

appdr.use(bodyParser.json())

appdr.get('/:id', async (req, res, next) => {
  try {
    const appData = await AppData.findOne({file_id: req.params.id})
    res.json({appData: appData})
  }
  catch (e) {
    error(res)
  }
})
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


// appdr.get('/create', async (req, res, next) => {
//   try {
//     const app = await App.findById('5ec672423723f438a8ea24e4')
//     const appData = await new AppData({
//       file_id: app._id,
//       data: [
//         {
//           type: 'value',
//           value: ''
//         }
//       ]
//     })
//     appData.save()
//     res.send(appData)
//   }
//   catch (e) {
//     error()
//   }
// })


const error = (res) => {res.status(500).json({message: 'Server Error', isError: true})}

module.exports = appdr