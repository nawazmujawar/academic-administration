const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const teacherSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phone: { type: Number, required: true },
    department: { type: String, enum: ['MECHANICAL', 'CIVIL', 'COMPUTER', 'CHEMICAL', 'ETC'], required: true },
    approved: { type: Boolean, default: false }
});

mongoose.plugin(timestamp);
teacherSchema.indexes({ employeeId: 1, email: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);