import React from 'react';
import { useLocation, useNavigate } from 'react-router';
function QuizResultPage() {

    const { state } = useLocation();
    const navigate = useNavigate();

    return (<div className=' h-screen flex-cols content-center'>

        <div className='mb-20 text-2xl'>QuizResult</div>
        <div className='text-2xl'>
            Your Score is: {state.score}
            <br></br>
            <div className='my-4'>
                {state.status == 'failed' ?
                    <h2 className='text-4xl text-red-600'>Failed</h2> : <h2 className='text-4xl text-green-600'>Passed</h2>
                }
            </div>
        </div>

        <button className='button' onClick={navigateToHome}>Back to Home</button>

    </div>

    )
    function navigateToHome() {
        navigate('/home')
    }
}

export default QuizResultPage