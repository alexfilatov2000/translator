import nodemailer from 'nodemailer';
import config from '#global-config' assert {type: 'json'};

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth    : {
        user : config.email,
        pass : config.emailPassword
    }
});

export default async function sendToVerify(email, url, subject, text) {
    const mailOptions = {
        from : config.email,
        to   : email,
        subject,
        text
    };

    console.log({
        user : config.email,
        pass : config.emailPassword
    })
    await transporter.sendMail(mailOptions);
}
