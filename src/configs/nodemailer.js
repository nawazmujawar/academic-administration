const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'academicappnotification',
        pass: 'Nawaz@123'
    }
});

//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


//Nawaz
//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