// Importazione dei pacchetti necessari
import express from 'express';
import cors from 'cors';
import productRouter from './routers/productRouter.js';
import searchRouter from './routers/searchRouter.js'
import orderRouter from './routers/checkoutRouter.js';
import imagePathMiddleware from './middlewares/imagePath.js';
import chatbotRouter from './routers/chatbotRouter.js';


// Creazione dell'istanza di Express e definizione della porta del server
const app = express();
const port = process.env.SERVER_PORT || 3000;

// Configurazione di CORS per consentire richieste dal frontend
app.use(cors({
    origin: process.env.FRONTEND_APP
}));

// Middleware
app.use(express.static('public')); // Servire file statici (es. immagini)
app.use(express.json()); // Parsing dei body JSON nelle richieste
app.use(imagePathMiddleware); // Middleware per la gestione degli URL delle immagini

// Definizione delle rotte
app.use('/products', productRouter); // Rotta per la gestione dei prodotti

app.use('/checkout', orderRouter); // Rotta per la gestione degli ordini

app.use('/search', searchRouter); //

app.use('/chatbot', chatbotRouter);

// Avvio del server
app.listen(port, () => {
    console.log(`Server kick-shop in funzione sulla porta: ${port}`);
});
