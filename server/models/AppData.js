const {Schema, model, Types} = require('mongoose');

const AppDataSchema = new Schema({
  file_id: {
    type: Types.ObjectId,
    required: true,
  },
  data: [
    {
      type: {type: String},
      value: {type: String}
    }
  ]
})

module.exports = model('AppData', AppDataSchema);;