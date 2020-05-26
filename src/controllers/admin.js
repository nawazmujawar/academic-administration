const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.getAdminDashboard = async (req, res, next) => {
    try {
        const teachers = await Teacher.find().exec();
        return res.status(200).render('adminDashboard', { teachers: teachers });
    } catch (error) {
        console.error(error);
    }
}

exports.approveTeacherAPI = (req, res, next) => {
    try {

        const { userId } = req.params;
        const { approved } = req.body;

        Teacher.findByIdAndUpdate({ _id: userId }, { approved: approved }, (err, teacher) => {
            if (err) {
                console.log(err);
            }
            if (teacher) {
                return res.status(201).redirect('/admin/dashboard');
            }
        });

    } catch (error) {
        console.error(error);
    }
}

exports.removeTeacherAPI = (req, res, next) => {
    try {
        const { userId } = req.params;

        Teacher.findByIdAndDelete(userId, (err, teacher) => {
            if (err) {
                console.log(err);
            }
            return;
        });

    } catch (error) {
        console.err(error);
    }
}

exports.signoutAdmin = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err) {
                return res.status(200).redirect('/signin/admin');
            } else {
                return res.status(404).json(err);
            }
        })
    } catch (error) {
        console.error(error);
    }

}