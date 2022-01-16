import nodemailer from 'nodemailer';

const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});


export default async function handler(req, res) {
    const {name, age, mail, tel} = req.body;

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: '../views/'
    }));

    const subject = 'Not a scam';
    const from = 'From: Real Person <NoScamForReal@gmail.com>';
    //const text = "";
    const template = "mailTemplate";
    const context = {
        vName: name,
        vTel: tel,
        vAge: age,
    };
    const attachments = [{
        filename: 'logo.png',
        path: './logo.png',
        cid: 'logo'
    }];

    //const html = "<!DOCTYPE html>  <html lang='en'> <head> <meta charset='UTF-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <title>Document</title> <style>@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap'); * {margin: 0;padding: 0;border: 0;} body{font - family:'Raleway', sans - serif;background - color: #d8dada;font - size:19px;max - width800px;margin: 0auto;padding: 3 %;}img{max - width:100 %;}header{text - align:center;font - size:30px;color: aqua;}#wrapper{background - color: #186aac;}h1{color:aqua;text - align:center;margin: 3 %;}p{color: ghostwhite;text - align:center;margin: 3 %;}     #contact{text - align:center;padding - bottom:3 %;line - height:16px;font - size:12px;color: #ffffff;} </style> </head> <body> <div id='wrapper'> <header> <h1>DATENKRAKE AG</h1> </header> <div id='banner'> <imgsrc=''/public/logo.png'alt='' /> </div> <div id='text'> <h1>Hallo ${name} </h1> <p>Ich bin deine freundliche Datenkrake.Besten Dank, dass du dich auch mit ALTER Jahren noch bei unserem Datenverteildienstangemldet hast. Zusammen mit all den anderen Idio.... Freunden,werden wir deine Daten zu einem Paket zusammenschnüren und an diverse dubioseFirmen weiterverkaufen. </p> <h1>IST DAS NICHT AUFREGEND?</h1> <p>Und es kommt noch besser. Um dich bei unserem Dienst abzumelden, darfst du eine Gebühr von CHF 250.- bezahlen.Wir werden dir ab sofort wöchentlich eine Erinnerungsnachricht direkt auf dein Smartphone unter TELEFONNUMMERmit unseren Kontoangaben senden. </p> <footer> <p id='contact'>DATENKRAKE AG <br />SCAMSTRASSE 8 <br />NURSEICHIMGRIND, CH <br />passiert.natürlich@gar.nichts </p> </footer> </div> </div> </body> </html>";


        //  `Guten Abend, Ich bin ${name} und ${age} Jahre alt. Wenn Sie mich kennenlernen wollen, können Sie mich gerne unter: ${tel} erreichen`;

        try {
        const message = await transporter.sendMail({
        from,
        to: mail,
        subject,
        template,
        context,
        attachments,
        });
        res.json(message);
        } catch (error) {
        res.status(400).json(error);
        }
        }

/**
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// Step 2
transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));


// Step 3
let mailOptions = {
    from: 'noScam@gmail.com', // TODO: email sender
    to: 'jonathan.beeler@outlook.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    template: 'index',
    // send extra values to template
};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});



export default async function handler(req, res) {
    const {name, age, mail, tel} = req.body;

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs');
        }
        return log('Email sent!!!');
    });

}

 */
