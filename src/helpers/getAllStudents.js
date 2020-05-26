const Student = require('../models/student');


const getAllStudents = (department, year) => {
    return Student.find({ $and: [{ 'department': department }, { year: year }] }).exec();
}

exports.getAllStudents = getAllStudents;