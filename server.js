const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use the Gmail service
    auth: {
        user: 'taimoorjan13967@gmail.com',  // Your full Gmail email address
        pass: 'kdbo xwkx rgyo glzg',    // Use the App Password you generated
    },
    secure: true, // Use SSL/TLS

});

// Handle POST requests for the form submission
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Email data
    const mailOptions = {
        from: 'taimoorjan13967@gmail.com',  // Your full Gmail email address
        to: 'tj880599@gmail.com',   // The recipient's email address
        subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Email sending failed' });
    }
});

//static file
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
