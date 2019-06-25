const express = require('express');
const Twilio = require('twilio');
const dotEnv = require('dotenv');

dotEnv.config();
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

const createApptMsg = (username, date, time, plantdesc) => (
  `Hello ${username},\nThis is Water My Plants reminding you that ${plantname} ${date} at ${time} needs care. ${plantdesc}`
);

router.post('/', (req, res) => {
  const {
    phoneNumber, doctorName, patientName, date, time, customMsg,
  } = req.body;
  const apptMessage = createApptMsg(doctorName, patientName, date, time, customMsg);

  client.messages.create({
    body: apptMessage,
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
  })
    .then(message => res.send(message));
});

module.exports = { router, createApptMsg };