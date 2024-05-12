import React from 'react';

import { useNavigate } from 'react-router-dom';

function TrainingComplianceCard({ training, index }) {
    const navigate = useNavigate();
    console.log(training)
    return (
        <li key={index} style={{ textAlign: 'left' }}>
            <br />
            <h2>{training.title}</h2>
            <p>{training.description}</p>
            <strong>Code:</strong> {training.code}<br />
            <strong>Attempts:</strong> {training.attempts}<br />
            <strong>Status:</strong> {training.status}<br />
            {training.status === 'pending' && (
                <button onClick={() => {
                    navigate(`/quiz/${training.id}`);
                }}>Attempt Test</button>
            )}
            {training.status === 'completed' && (
                <div>
                    <strong>Score:</strong> {training.score}<br />
                    <strong>Completion Date:</strong> {training.completion_date || 'N/A'}
                </div>
            )}

        </li>
    )
}

export default TrainingComplianceCard