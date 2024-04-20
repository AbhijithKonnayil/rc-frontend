import React from 'react'

function TrainingComplianceCard({training,index}) {
    return (
        <li key={index} style={{ textAlign: 'left' }}>
            <h2>{training.title}</h2>
            <p>{training.description}</p>
            <strong>Code:</strong> {training.code}<br />
            <strong>Attempts:</strong> {training.attempts}<br />
            <strong>Status:</strong> {training.status}<br />
            {training.status === 'pending' && (
                <button onClick={() => { }}>Attempt Test</button>
            )}
            {training.status === 'complete' && (
                <div>
                    <strong>Score:</strong> {training.score}<br />
                    <strong>Completion Date:</strong> {training.completion_date || 'N/A'}
                </div>
            )}
        </li>
    )
}

export default TrainingComplianceCard