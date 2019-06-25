const express = require('express');
const router = express.Router();
var moment = require('moment');
var twilio = require('twilio');


var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioNumber = '+14439659861';

// GET: /twilio/twiliotest
router.get ('/twiliotest', (req, res) => {
  const twilioSendToNumber = '+19377661225';

  client.messages.create({
    to: `${twilioSendToNumber}`,  // Text this number
    from: `${twilioNumber}`, // From a valid Twilio number
    body: 'Hello World from Node'
    })
    .then((message) => console.log(message.sid))
    .catch(err => {
      console.log('twilio create err', err);
      res.status(500).json(err);
    });
});


// GET: /twilio/create
router.get('/create', function(req, res, next) {
    res.render('appointments/create', {
      timeZones: getTimeZones(),
      appointment: new Appointment({name: '',
                                    phoneNumber: '',
                                    notification: '',
                                    timeZone: '',
                                    time: ''})});
  });

//   var AppointmentSchema = new mongoose.Schema({
//     name:String,
//     phoneNumber: String,
//     notification : Number,
//     timeZone : String,
//     time : {type : Date, index : true}
//   });
