const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

app.use(express.json());

// Route de test pour OpenAI
app.post('/api/openai', async (req, res) => {
    const prompt = req.body.prompt; // Prendre le prompt du corps de la requête

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Modèle que tu souhaites utiliser
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API OpenAI:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API OpenAI');
    }
});

// Route de test
app.get('/', (req, res) => {
    res.send('Bonjour ! Le serveur est en cours d\'exécution.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
