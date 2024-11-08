// src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import AppointmentForm from './components/AppointmentForm';

function App() {
    return (
        <div className="App">
            <h1>Chatbot Médical</h1>
            <Chatbot />
            <AppointmentForm />
        </div>
    );
}

export default App;
