const accountSid = 'ACe26c5a5387b5f0c0d42477d1f574bb59'; // Your Account SID from www.twilio.com/console
const authToken = '7823366de091585e0d301c65f70ab7ec';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const twilioNumber = '+17622043207';


client.messages.create({
    body: 'Hello World from Node',
    to: '+15204280498',  // Text this number
    from: `${twilioNumber}` // From a valid Twilio number
})
.then((message) => console.log(message.sid));
