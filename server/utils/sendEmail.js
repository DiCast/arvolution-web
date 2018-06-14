var sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_KEY)

module.exports = function sendEmail(message) {
  console.log('the message to send', message);
  var text = 
    'Name:\n' + message.name + '\n\n' +
    'Email:\n' + message.email + '\n\n' +
    'Message:\n\n\n' + message.message;

  var msg = {
    to: 'david@arvolution.com',
    from: 'info@arvolution.com',
    subject: 'New message from website',
    text: text,
  }

  sendgrid.send(msg)
}
