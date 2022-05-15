import nodemailer from 'nodemailer';
import config from '#global-config' assert {type: 'json'};

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth    : {
        user : config.email,
        pass : config.emailPassword
    }
});

export default async function sendToVerify(email, url, subject, txt) {
    const mailOptions = {
        from : config.app.email,
        to   : email,
        subject,
        text : `${txt}${url}`
    };

    await transporter.sendMail(mailOptions);
}
