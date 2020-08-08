const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

router.get('/', (req,res) => {
  res.render('index.html', {title: 'Provene'});
})

router.get('/contact', (req,res) => {
  res.render('contact.html', {title: 'Contacto'});
})

router.get('/about', (req,res) => {
  res.render('about.html', {title: 'Nosotros'});
})

router.get('/services', (req,res) => {
  res.render('services.html', {title: 'Productos'});
})

router.get('/success', (req,res) => {
  res.render('success.html', {title: 'Mensaje enviado'});
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
    from: "'User contact' <contactoprovene@gmail.com>",
    to: 'vmanuel.deabreu1@gmail.com',
    subject: 'Contacto desde Provene',
    html: contentHTML
  });

  res.redirect('/success');
})
module.exports = router;