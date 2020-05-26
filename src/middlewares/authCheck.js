exports.redirectToDashboardTeacher = (req, res, next) => {
    if (req.session.userId) {
        return res.status(200).redirect('/teacher/dashboard');
    } else {
        return next();
    }
}

exports.redirectToSignInTeacher = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(200).redirect(`/signin/teacher`);
    } else {
        return next();
    }
}

exports.redirectToFeedStudent = (req, res, next) => {
    if (req.session.userId) {
        return res.status(200).redirect('/student/feed');
    } else {
        return next();
    }
}

exports.redirectToSignInStudent = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(200).redirect('/signin/student');
    } else {
        return next();
    }
}

exports.redirectToDashboardAdmin = (req, res, next) => {
    if (req.session.userId) {
        return res.status(200).redirect('/admin/dashboard');
    } else {
        return next();
    }
}

exports.redirectToSignInAdmin = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(200).redirect('/signin/admin');
    } else {
        return next();
    }
}