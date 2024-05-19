import React from 'react';

import { useNavigate } from 'react-router-dom';

function TrainingComplianceCard({ training, index }) {
    const navigate = useNavigate();
    console.log(training)
    return (
        <li key={index} style={{ textAlign: 'left' }}>
            <div className="bg-gray-200 rounded-lg shadow-lg p-6 m-4">
                <h2 className="text-xl font-semibold">{training.title}[  {training.code}] </h2>
                <p className="text-gray-700">{training.description}</p>
                <div className="mt-4">

                    <strong>Attempts:</strong> {training.attempts}<br />
                    <strong>Status:</strong> {training.status}<br />
                    {training.status === 'pending' && (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={() => {
                                navigate(`/quiz/${training.id}`);
                            }}
                        >
                            Attempt Test
                        </button>
                    )}
                    {training.status === 'completed' && (
                        <div>
                            <strong>Score:</strong> {training.score}<br />
                            <strong>Completion Date:</strong> {training.completion_date || 'N/A'}
                        </div>
                    )}
                </div>
            </div>

        </li>
    )
}

export default TrainingComplianceCard