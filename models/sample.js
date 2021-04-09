var mongoose = require("mongoose")
var sampleSchema = new mongoose.Schema({
  name:String
})
module.exports = mongoose.model('Sample', sampleSchema)
