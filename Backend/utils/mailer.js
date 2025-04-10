// utils/mailer.js
import nodemailer from 'nodemailer';


// Crea un trasportatore per l'invio delle email
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',  // Il tuo host di Mailtrap
  port: 587,
  secure: false,  // non usare SSL
  auth: {
    user: '88e355bf61b85d',  // Inserisci il tuo user ID di Mailtrap
    pass: 'bd88091569b2d6'  // Inserisci la tua password di Mailtrap
  }
});

// Funzione per inviare l'email di conferma
export function sendOrderConfirmationEmail(userEmail, orderId, totalPrice, userName, userSurname, city, province, telephone, addressShipping, orderProducts) {

  const emailVenditore = "pepe2117k@gmail.com"

  const tabRowsDynamic = orderProducts.map(product => `
  <tr>
    <td style="padding: 8px;">${product.name}</td>
    <td style="text-align: center; padding: 8px;">${product.quantity}</td>
    <td style="text-align: right; padding: 8px;">${(product.price * product.quantity).toFixed(2)} €</td>
  </tr>
`).join('');

  // Definisci le opzioni per l'email
  const userMailOptions = {
    from: '115e86fd529a3e@smtp.mailtrap.io',  // Modifica con un'email reale
    to: userEmail, // Email del destinatario, tra apici
    subject: `Conferma del tuo ordine #${orderId}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; background-color: #fafafa;">
  
  <!-- HEADER -->
  <div style="text-align: center; padding-bottom: 20px;">
    <img src="https://i.imgur.com/TYCP4lX.jpeg" alt="Logo Azienda" style="max-width: 100%; height: 50%;" />
    <h2 style="color: #4CAF50; margin-top: 10px;">Grazie per il tuo ordine, <span style="color: #333;">${userName}</span>!</h2>
  </div>

  <!-- DETTAGLI ORDINE -->
  <p style="font-size: 16px; color: #555;">
    Abbiamo ricevuto correttamente il tuo ordine <strong>#${orderId}</strong>.
    Qui sotto trovi il riepilogo:
  </p>

  <!-- LISTA PRODOTTI -->
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f0f0f0;">Prodotto</th>
        <th style="text-align: center; padding: 8px; background-color: #f0f0f0;">Quantità</th>
        <th style="text-align: right; padding: 8px; background-color: #f0f0f0;">Prezzo</th>
      </tr>
    </thead>
    <tbody>
    ${tabRowsDynamic}
    </tbody>
  </table>

  <!-- TOTALE -->
  <p style="text-align: right; margin-top: 10px; font-size: 18px; color: #333;">
    <strong>Totale dell'ordine: ${totalPrice.toFixed(2)} €</strong>
  </p>

  <!-- INDIRIZZO -->
  <p style="font-size: 14px; color: #666;">
    Spedizione a: <br />
    <strong>${addressShipping}</strong><br /> 
    ${city}, ${province}<br />
    Telefono: ${telephone}
  </p>

  <!-- FOOTER -->
  <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
    Questa è una mail automatica, ti risponderemo il prima possibile. <br />
    <a href="http://localhost:5173" style="color: #4CAF50; text-decoration: none;">Visita il nostro sito</a> | © 2025 Kick Shop
  </div>

</div>

 
    `
  };

  const vendorMailOptions = {
    from: '115e86fd529a3e@smtp.mailtrap.io',  // Modifica con un'email reale
    to: emailVenditore, // Email del destinatario, tra apici
    subject: `Conferma del tuo ordine #${orderId}`,
    html: `
      <!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Nuovo Ordine Ricevuto</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
    <h2>📦 Hai ricevuto un nuovo ordine!</h2>

    <h3>👤 Dati Cliente:</h3>
    <p>
      <strong>Nome:</strong> ${userName} ${userSurname}<br>
      <strong>Email:</strong> ${userEmail}<br>
      <strong>Telefono:</strong> ${telephone}<br>
      <strong>Indirizzo di spedizione:</strong> ${addressShipping}<br>
      <strong>Città:</strong> ${city} (${province})
    </p>

    <h3>🛒 Dettagli ordine:</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid #ccc; padding: 8px;">Prodotto</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Quantità</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Totale</th>
        </tr>
      </thead>
      <tbody>
        ${tabRowsDynamic} 
      </tbody>
    </table>

    <h3 style="text-align: right; margin-top: 20px;">Totale Ordine: ${totalPrice.toFixed(2)} €</h3>

    <p style="margin-top: 30px;">Controlla il gestionale per processare l’ordine oppure contatta il cliente se necessario.</p>

    <p style="font-size: 12px; color: #888;">Email generata automaticamente.</p>
  </body>
  </html>
    
    `
  };




  // Invia l'email
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.log('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata: ' + info.response);
    }
  });

  transporter.sendMail(vendorMailOptions, (error, info) => {
    if (error) {
      console.log('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata: ' + info.response);
    }
  });
}



