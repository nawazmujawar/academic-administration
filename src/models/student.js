const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');


const studentSchema = new mongoose.Schema({
    studentId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String },
    phone: { type: Number, required: true },
    department: { type: String, enum: ['MECHANICAL', 'CIVIL', 'COMPUTER', 'CHEMICAL', 'ETC'], required: true },
    approved: { type: Boolean, default: false },
    year: { type: String, enum: ['FE', 'SE', 'TE', 'BE', 'ALL'], required: true },
    approved: { type: Boolean, default: false }
});

studentSchema.indexes({ studentId: 1, email: 1 });

module.exports = mongoose.model('Student', studentSchema);