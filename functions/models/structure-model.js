const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Structure = new Schema(
    {
        key: { type: String, required: true },
        rowdata: { type: Array, required: true },

    },
    { timestamps: true, collection:'structure'},
)

module.exports = mongoose.model('structure', Structure)