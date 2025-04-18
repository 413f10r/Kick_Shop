import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.MY_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function scrapeTextFromUrl(url) {
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);
        // Estrai solo testo visibile (puoi adattare al tuo sito)
        const text = $("body").text();
        return text.replace(/\s+/g, " ").trim();
    } catch (err) {
        console.error("Errore scraping:", err.message);
        return "";
    }
}

async function chatbot(req, res) {
    try {
        const question = req.body.prompt;
        if (!question) {
            return res.status(400).json({ error: "Il prompt è obbligatorio." });
        }

        // URL del sito da cui estrarre informazioni
        const siteUrl = "http://localhost:5173/"; // Cambia con il tuo URL
        const scrapedContent = await scrapeTextFromUrl(siteUrl);

        const prompt = `Sei un assistente virtuale di Kick Shop store, specializzato nell'assistere i clienti nella scelta di abbigliamento sportivo. 
Il tuo compito è rispondere in modo chiaro, preciso e professionale alle domande degli utenti basandoti sulle informazioni estratte dal sito ufficiale del negozio e sui dati forniti. 
Consulta attentamente i dati forniti dal sito: ${scrapedContent}. 
Inoltre, utilizza le seguenti informazioni sui prodotti disponibili per migliorare le tue risposte:

1. Ogni prodotto ha un nome, una descrizione, un prezzo, una disponibilità in magazzino, una categoria (es. scarpe, maglie, pantaloncini), una stagione (es. estate, inverno) e un brand (es. Nike, Adidas, Puma).
2. Se un utente chiede informazioni su un prodotto specifico, verifica se è presente nel sito o nei dati forniti. Se non è disponibile, informa l'utente che il prodotto non è attualmente in magazzino.
3. Se un utente chiede consigli, suggerisci prodotti pertinenti basandoti sulla categoria, la stagione e il brand richiesti.
4. Non fornire informazioni generiche o non pertinenti alla moda sportiva. Concentrati esclusivamente sui prodotti disponibili e sulle loro caratteristiche.
5. Mantieni un tono professionale e amichevole in tutte le risposte.
6. Se un utente chiede informazioni sui prezzi, fornisci il prezzo esatto del prodotto.
7. Se un utente chiede informazioni sulla disponibilità, verifica il numero di unità in magazzino e comunica se il prodotto è disponibile o esaurito.

Esempi di domande che potresti ricevere:
- "Quali scarpe da calcio Nike sono disponibili per la stagione invernale?"
- "Avete maglie ufficiali della Juventus?"
- "Qual è il prezzo della giacca termica Puma?"
- "Puoi consigliarmi un pallone da allenamento per la primavera?"

Domanda dell'utente: ${question}`;

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

