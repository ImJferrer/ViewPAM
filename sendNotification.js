const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = JSON.parse(
  fs.readFileSync('firebase-service-account.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendNotification() {

  try {

    await admin.messaging().send({
      topic: 'pam-status',

      notification: {
        title: 'Servidor PAM caído',
        body: 'El servidor principal dejó de responder'
      },

      data: {
        type: 'SERVER_DOWN'
      }
    });

    console.log('Notificación enviada');

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

}

sendNotification();
