import { getProducts } from "../data/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Configura Gemini con la chiave API
const genAI = new GoogleGenerativeAI(process.env.MY_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function chatbot(req, res) {
    try {
        const question = req.body.prompt;
        if (!question) {
            return res.status(400).json({ error: "Il prompt è obbligatorio." });
        }

        // Recupera i dati dei prodotti dal database
        const products = await getProducts();

        // Verifica che i prodotti siano stati recuperati correttamente
        if (!products || products.length === 0) {
            return res.status(404).json({ error: "Nessun prodotto trovato nel database." });
        }

        // Limita i dati per evitare problemi di dimensione del prompt
        const limitedProducts = products.slice(0, 10).map(({ slug, name, price, description, availability, brand }) => ({
            slug,
            name,
            price,
            description,
            availability,
            brand
        }));

        // Crea il prompt per Gemini
        const prompt = `Sei un assistente virtuale di Kick Shop store, specializzato nell'assistere i clienti nella scelta di abbigliamento sportivo. 
        Utilizza le seguenti informazioni sui prodotti disponibili per migliorare le tue risposte:

        DATABASE PRODOTTI:
        ${JSON.stringify(limitedProducts, null, 2)}

        Domanda dell'utente: ${question}`;

        // Invia il prompt a Gemini
        const result = await model.generateContent(prompt);
        const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            res.json({ response: text });
        } else {
            res.status(500).json({ error: "Nessuna risposta valida da Gemini." });
        }
    } catch (error) {
        console.error("Errore durante la chiamata a Gemini:", error);
        res.status(500).json({ error: "Errore durante la comunicazione con Gemini." });
    }
}

export default chatbot;