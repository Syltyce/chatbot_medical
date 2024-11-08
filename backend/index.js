const express = require('express');
const axios = require('axios');
const sequelize = require('./config/database');
const User = require('./models/User'); // Importer ton modèle Sequelize
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

// Connexion à la base de données MySQL avec Sequelize
    async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie !');
        await sequelize.sync(); // Ou sequelize.sync({ force: true }) pour réinitialiser la base
        console.log('Tables synchronisées avec succès.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
    }

testConnection();


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
        const messageContent = response.data.choices[0].message.content;
        res.json({ message: messageContent });
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API OpenAI:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API OpenAI');
    }
});

// Route de test
app.get('/', (req, res) => {
    console.log('Bonjour, bienvenue sur l\'API!');
    res.send('Bonjour ! Le serveur est en cours d\'exécution');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(JSON.parse(JSON.stringify(users, null, 2)));
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

// Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
    try {
        const { prenom, nom, age, email, date_naissance } = req.body;
        const user = await User.create({ prenom, nom, age, email, date_naissance });
        res.status(201).json(user); // Retourner l'utilisateur créé
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
