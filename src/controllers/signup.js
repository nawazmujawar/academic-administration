//Models
const Teacher = require('../models/teacher');
const Student = require('../models/student');

exports.getTeacherSignUp = (req, res, next) => {
    try {
        return res.status(200).render('signupTeacher', { isSuccess: false, isTeacherExists: false });
    } catch (error) {
        console.error(error);
    }
}

exports.postTeacherSignUp = async (req, res, next) => {
    try {
        const { employeeId, email, password, fullName, phone, department, standard } = req.body;
        console.log(req.body);

        const _teacher = new Teacher({
            employeeId: employeeId,
            email: email,
            password: password,
            fullName: fullName,
            phone: phone,
            department: department,
            standard: standard
        });
        const isEmployeeIdExists = await Teacher.findOne({ employeeId: employeeId });
        const isEmailExists = await Teacher.findOne({ email: email });

        if (!isEmployeeIdExists && !isEmailExists) {
            await _teacher.save();
            return res.status(201).render('signupTeacher', { isSuccess: true, isTeacherExists: false });
        } else {
            return res.status(201).render('signupTeacher', { isSuccess: true, isTeacherExists: true });
        }

    } catch (error) {
        console.error(error);
    }
}

exports.getStudentSignIn = (req, res, next) => {
    try {
        return res.status(200).render('signupStudent', { isSuccess: false, isStudentExists: false });
    } catch (error) {
        console.error(error);
    }
}

exports.postStudentSignUp = async (req, res, next) => {
    try {
        const { studentId, email, password, fullName, phone, department, year } = req.body;

        const _student = new Student({
            studentId: studentId,
            email: email,
            password: password,
            fullName: fullName,
            phone: phone,
            department: department,
            year: year
        });
        const isStudentIdExists = await Student.findOne({ studentId: studentId });
        const isEmailExists = await Student.findOne({ email: email });

        if (!isStudentIdExists && !isEmailExists) {
            await _student.save();
            return res.status(201).render('signupStudent', { isSuccess: true, isStudentExists: false });
        } else {
            return res.status(201).render('signupStudent', { isSuccess: true, isStudentExists: true });
        }
    } catch (error) {
        console.error(error);
    }
}