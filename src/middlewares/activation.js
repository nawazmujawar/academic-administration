exports.isTeacherActivated = (req, res, next) => {
    if (req.session.approved) {
        next();
    } else {
        return res.status(200).render('activation');
    }

}