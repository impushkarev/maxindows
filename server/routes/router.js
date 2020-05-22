const Router = require('express')
const router = Router()

router.use('/api/app', require('./app'))
router.use('/api/appdata', require('./appData'))


module.exports = router