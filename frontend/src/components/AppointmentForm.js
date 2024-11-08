// src/components/AppointmentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/appointments', {
                prenom, nom, age, email, date_naissance: dateNaissance
            });
            setMessage('Rendez-vous réservé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la réservation :', error);
            setMessage('Erreur lors de la réservation.');
        }
    };

    return (
        <div>
            <h2>Réserver un rendez-vous</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Prénom"
                />
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Nom"
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Âge"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="date"
                    value={dateNaissance}
                    onChange={(e) => setDateNaissance(e.target.value)}
                />
                <button type="submit">Réserver</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AppointmentForm;
