const mongoose = require('mongoose')

mongoose
    .connect(
    	'mongodb+srv://dbuser:test1234@cluster0.o6o9w.mongodb.net/rezume?retryWrites=true&w=majority', 
    	{ useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db