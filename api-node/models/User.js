const mongoose = require('mongoose');

const User = mongoose.model('User', {
    matricula: Number,
    email: String,
    password: String
})

module.exports = User