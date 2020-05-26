const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});


module.exports = mongoose.model('Admin', adminSchema);