import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { State } from '../components/StateBuilder';
import { Dialogs } from '../lib/exceptions';
import QuizService from "../services/QuizService";
function TakeQuizPage() {
    const { id } = useParams();
    const [state, setState] = useState(State.initial);
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState([])
    const navigate = useNavigate();
    useEffect(() => { getQuiz() }, [])

    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    return (
        <div>
            <div>TakeQuiz {id}</div>
            <ol>
                {quiz.map((q, index) => (
                    <li key={index} style={{ textAlign: 'left' }}>
                        <p>{q.question_text}</p>
                        <input
                            type='radio'
                            value='a'
                            name={q.id}
                            onChange={() => handleAnswerChange(q.id, 'a')}
                        />
                        <label>{q.option_a}</label>
                        <input
                            type='radio'
                            value='b'
                            name={q.id}
                            onChange={() => handleAnswerChange(q.id, 'b')}
                        />
                        <label>{q.option_b}</label>

                        <input
                            type='radio'
                            value='c'
                            name={q.id}
                            onChange={() => handleAnswerChange(q.id, 'c')}
                        />
                        <label>{q.option_c}</label>

                        <input
                            type='radio'
                            value='d'
                            name={q.id}
                            onChange={() => handleAnswerChange(q.id, 'd')}
                        />
                        <label>{q.option_d}</label>

                        <input
                            type='radio'
                            value='e'
                            name={q.id}
                            onChange={() => handleAnswerChange(q.id, 'e')}
                        />
                        <label>{q.option_e}</label>
                    </li>
                ))}
            </ol>
            <button onClick={onSubmit}>submit</button>
        </div >
    )
    async function getQuiz() {
        setState(State.loading);
        try {
            const res = await QuizService.getQuiz(id);
            console.log(res)
            setQuiz(res)
            console.log(state);
        } catch (error) {
            console.log(error);
        }
    }

    async function onSubmit() {
        try {
            const ans = Object.keys(answers).map(key => ({
                id: key,
                answer: answers[key]
            }));
            const res = await QuizService.submitAnswer(id, ans)
            console.log(res);
            navigate("/quiz-result", { state: res })
        } catch (error) {
            Dialogs.showAlert(error);
        }
    }
}

export default TakeQuizPage