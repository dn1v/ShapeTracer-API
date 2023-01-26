//////////////////////////////////////////////////
// just wanted to try third-party email service //
//////////////////////////////////////////////////

const sendGridMail = require('@sendgrid/mail')


sendGridMail.setApiKey(process.env.SG_API_KEY)


const welcomeEmail = (email, name) => {
    sendGridMail.send({
        to: email,
        from: 'danilov.miroslav@gmail.com',
        subject: 'Testing Sendgrid - WELCOME ' + name,
        text: 'Trebalo bi da stigne...'
    })
}

const cancelationEmail = (email, name) => {
    sendGridMail.send({
        to: email,
        from: 'danilov.miroslav@gmail.com',
        subject: 'Testing Sendgrid - GOODBYE',
        text: `Cliche like: "Sad to se you go ${name}"...`
    })
}


module.exports = {
    welcomeEmail,
    cancelationEmail
}