import React, { useState } from "react";
import ChatBotSection from "./ChatBotSection"; // Importa il componente della chat

export default function ChatbotToggle() {
    const [isChatOpen, setIsChatOpen] = useState(false); // Stato per la visibilità della chat

    return (
        <>
            {/* GIF per aprire/chiudere la chat */}
            <div
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "5px",
                    maxWidth: "80px",
                    height: "auto",
                    zIndex: 1000,
                    cursor: "pointer", // Indica che è cliccabile
                }}
                onClick={() => setIsChatOpen(!isChatOpen)} // Toggle della visibilità della chat
            >
                <img
                    src="/src/assets/img/Animation-1745443318366.gif"
                    alt="Loading Animation"
                    className="animation-gif"
                    style={{ maxWidth: "65px" }}
                />
                <h6 className="text-center text-primary">HELP!</h6>
            </div>

            {/* Mini chat */}
            {isChatOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "100px", // Posiziona sopra la GIF
                        right: "10px",
                        width: "300px",
                        height: "400px",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        zIndex: 1001,
                    }}
                >
                    <ChatBotSection /> {/* Componente della chat */}
                </div>
            )}
        </>
    );
}