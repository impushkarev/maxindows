const {Schema, model} = require('mongoose');

const AppSchema = new Schema({
  icon: {
    type: String,
    required: [true, 'Icon is required'],
  },
  app: {
    type: String,
    required: [true, 'Appname is required'],
  },
  name: {
    type: String,
    required: [true, 'Filename is required'],
  }
})

module.exports = model('App', AppSchema);;