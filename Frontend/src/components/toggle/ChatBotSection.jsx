import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "../../css/ChatBot.css";
export default function ChatBotSection() {
  const [messages, setMessages] = useState([]); // Stato per i messaggi
  const [input, setInput] = useState(""); // Stato per l'input dell'utente

  // Funzione per inviare il messaggio
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Aggiungi il messaggio dell'utente
    setMessages([...messages, { sender: "user", text: input }]);

    // Simula una risposta del chatbot (puoi sostituirlo con una chiamata API)
    const response = await fetch("http://localhost:3000/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await response.json();

    // Aggiungi la risposta del chatbot
    setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    setInput(""); // Resetta l'input
  };

  return (
    <div className="chatbot-container">
      {/* Area messaggi */}
      <h3>Il tuo assistente virtuale</h3>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input e pulsante */}
      <InputGroup className="chatbot-input">
        <Form.Control
          as="textarea"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="mi serve aiuto per..."
        />
        <Button variant="primary" onClick={sendMessage}>
          Invia
        </Button>
      </InputGroup>
    </div>
  );
}