import React from 'react';
import { useLocation, useNavigate } from 'react-router';
function QuizResultPage() {

    const { state } = useLocation();
    const navigate = useNavigate();

    return (<div>

        <div>QuizResult</div>
        <div>
            Your Score is: {state.score}
            <br></br>
            Status :{state.status}
        </div>

        <button onClick={navigateToHome}>Back to Home</button>

    </div>

    )
    function navigateToHome() {
        navigate('/home')
    }
}

export default QuizResultPage