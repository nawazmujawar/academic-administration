
//Models
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Admin = require('../models/admin');

exports.getTeacherSignIn = (req, res, next) => {
    try {
        return res.status(200).render('signInTeacher', { isSuccess: true });
    } catch (error) {
        console.error(error);
    }
}

exports.postTeacherSignIn = async (req, res, next) => {
    try {
        const { employeeId, email, password } = req.body;
        /* const redirectTo = req.session.redirectTo || '/teacher/dashboard';
        delete req.session.redirectTo; */

        await Teacher.findOne({ $and: [{ email: email }, { employeeId: employeeId }] }).exec().then(teacher => {
            if (teacher) {
                if (teacher.password == password) {
                    req.session.userId = teacher._id;
                    req.session.name = teacher.fullName;
                    req.session.employeeId = teacher.employeeId;
                    req.session.email = teacher.email;  
                    req.session.department = teacher.department;
                    req.session.approved = teacher.approved;
                    return res.status(200).redirect('/teacher/dashboard/');
                } else {
                    return res.status(401).render('signInTeacher', { isSuccess: true })
                }
            } else {
                return res.status(200).render('signInTeacher', { isSuccess: false });
            }
        });
    } catch (error) {
        console.error(error);
    }
}

exports.getStudentSignIn = (req, res, next) => {
    try {
        return res.status(200).render('signInStudent', { isSuccess: true });
    } catch (error) {
        console.error(error);
    }
}

exports.postStudentSignIn = async (req, res, next) => {
    try {
        const { studentId, email, password } = req.body;

        /* const redirectTo = req.session.redirectTo || '/student/feed';
        delete req.session.redirectTo; */

        await Student.findOne({ $and: [{ email: email }, { studentId: studentId }] }).exec().then(student => {
            if (student) {
                if (student.password == password) {
                    req.session.userId = student._id;
                    req.session.studentId = student.studentId;
                    req.session.email = student.email;
                    req.session.department = student.department;
                    req.session.year = student.year
                    req.session.name = student.fullName
                    return res.status(200).redirect('/student/feed');
                } else {
                    return res.status(401).render('signInStudent', { isSuccess: true })
                }
            } else {
                return res.status(200).render('signInStudent', { isSuccess: false });
            }
        });
    } catch (error) {
        console.error(error);
    }
}

exports.getAdminSignIn = (req, res, next) => {
    try {
        return res.status(200).render('signinAdmin', { isSuccess: true });
    } catch (error) {
        console.error(error);
    }
}

exports.postAdminSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await Admin.findOne({ email: email }).exec().then(admin => {
            if (admin) {
                if (admin.password == password) {
                    req.session.userId = admin._id;
                    return res.status(200).redirect('/admin/dashboard');
                }
                return res.status(401).render('signinAdmin', { isSuccess: false });
            }
            return res.status(401).render('signinAdmin', { isSuccess: false });
        }).catch(error => {
            console.error(error);
        });

    } catch (error) {
        console.error(error);
    }
}