const express = require('express')
const cors = require('cors')
var nodemailer = require('nodemailer');

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.get('/data', (req, res) => {
    res.send('Hello World!')
})
app.post('/data', (req, res) => {
    const data = req.body;
    console.log(data);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'allthingspcbdesign@gmail.com',
            pass: 'allthingspcb'
        }
    });

    var mailOptions = {
        from: 'allthingspcbdesign@gmail.com',
        to: 'yjaidka48@gmail.com',
        subject: 'Requested callback from all things PCB',
        text: `${data.name} requested a callback. Mobile number is ${data.mobile}.Message is ${data.text}. Type ( if selected ) is ${data.type} `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('Got a POST request')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


