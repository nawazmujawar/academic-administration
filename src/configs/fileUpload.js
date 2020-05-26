const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.mimetype == 'application/pdf') {
            cb(null, 'uploads/attachments');
        }

        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, 'uploads');
        }

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage });