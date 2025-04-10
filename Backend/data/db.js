// Importazione del pacchetto MySQL
import mysql from 'mysql2';

// Creazione della connessione al database con le variabili d'ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connessione al database e gestione degli errori
connection.connect((err) => {
    if (err) throw err;
    console.log('Connesso al database');
});

// Esportazione della connessione per essere utilizzata in altri file
export default connection;
