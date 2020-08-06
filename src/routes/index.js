const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.get('/', (req,res) => {
  res.render('index.html', {title: 'Biosafety'});
})

router.get('/contact', (req,res) => {
  res.render('contact.html', {title: 'Contact Biosafety'});
})

router.get('/about', (req,res) => {
  res.render('about.html', {title: 'About Biosafety'});
})

router.get('/services', (req,res) => {
  res.render('services.html', {title: 'What we do'});
})

router.get('/opportunities', (req,res) => {
  res.render('opportunities.html', {title: 'Opportunities'});
})

router.get('/success', (req,res) => {
  res.render('success.html', {title: 'Message sent'});
})

router.post('/send-email', async (req,res) => {
  const { email, message } = req.body;

  contentHTML = `
    <h1>User information</h1>
    <ul>
      <li>Email: ${email}</li>
    </ul>
    <p>${message}</p>
  `;

  //El correo de quien envía. Servicio que se va a usar
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: "'User contact' <vmanuel.deabreu1@gmail.com>",
    to: 'vicdeabreu@gmail.com',
    subject: 'Contacto desde Bioservice',
    html: contentHTML
  });

  res.redirect('/success');
})
module.exports = router;