require('dotenv').config()
const mongoose = require('mongoose')
const functions  = require('firebase-functions')

mongoose
    .connect(
    	`mongodb+srv://${process.env.dbuser}:${process.env.dbpwd}@${process.env.dbcluster}/${process.env.dbcollection}?retryWrites=true&w=majority`, 
    	{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db