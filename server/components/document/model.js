/* global Promise */
const mongoose = require('mongoose')
mongoose.Promise = Promise
const Schema = mongoose.Schema

const documentSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  conversions: { type: Object, required: false }
}, { timestamps: true })

documentSchema.methods.addConversion = function (conversion) {
  if (!this.conversions) {
    this.conversions = []
  }
  this.conversions.push(conversion)

  return this.save()
}

const Document = mongoose.model('Document', documentSchema)

module.exports = Document
