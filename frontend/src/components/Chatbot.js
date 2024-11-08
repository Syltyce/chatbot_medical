// src/components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/openai', {
                prompt: userInput
            });
            setResponse(res.data.message); // Utilisation de la clé 'message' dans la réponse
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
            setResponse('Désolé, quelque chose s\'est mal passé.');
        }
    };

    return (
        <div>
            <h2>Chatbot Médical</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Posez une question..."
                />
                <button type="submit">Envoyer</button>
            </form>
            <div>
                <h3>Réponse :</h3>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default Chatbot;
