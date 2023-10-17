// const twilio = require('twilio');

// const accountSid = 'AC5165bd589aa3a1328f050d6b03567874';
// const authToken = '87f8051e849f44a5894ca16aa5ab00b0';

// const client = twilio(accountSid, authToken);

// const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Correctly formatted
// const toWhatsAppNumber = 'whatsapp:+254710251692'; // Correctly formatted

// const imageURl = 'https://cdn.pixabay.com/photo/2023/08/08/09/20/wedding-8176868_640.jpg';

// client.messages.create({
//     from: fromWhatsAppNumber,
//     to: toWhatsAppNumber,
//     body: 'Here is the image:',
//     mediaUrl: imageURl,
// })
//     .then(message => {
//         console.log(`Message sent: ${message.sid}`);
//     })
//     .catch(error => {
//         console.error(`Error sending message: ${error}`);
//     });
