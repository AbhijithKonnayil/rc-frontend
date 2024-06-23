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
    const [currentQuestion, setCurrentQuestion] = useState();
    useEffect(() => { getQuiz() }, [])

    const handleAnswerChange = (questionId, selectedOption) => {
        console.log(`selectedOption ${selectedOption} ,`)
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
        console.log(answers)
    };
    const q = quiz[currentQuestion];
    if (q) {
        console.log(currentQuestion)
        return (
            <div className='m-auto p-10 w-2/4 flex flex-col h-screen'>
                <div className='fle'>TakeQuiz {id}</div>
                < QuestionCard q={q} handleAnswerChange={handleAnswerChange} selectedOption={answers[q.id]} />
                <div className='flex justify-between flex'>
                    {currentQuestion > 0 ?
                        <button className='button' onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button> : <div className='w-40	'></div>}

                    <button className='button' onClick={onSubmit}>Submit</button>{currentQuestion < quiz.length - 1 ?
                        <button className='button' onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button> : <div className='w-40	'></div>}
                </div>

            </div>
        );
    } return (<div>loading</div>);

    async function getQuiz() {
        setState(State.loading);
        try {
            const res = await QuizService.getQuiz(id);

            const quizWithOptions = res.map((q) => ({
                ...q, "options": [{ 'value': 'a', 'label': q.option_a },
                { 'value': 'b', 'label': q.option_b },
                { 'value': 'c', 'label': q.option_c },
                { 'value': 'd', 'label': q.option_d },
                { 'value': 'e', 'label': q.option_e }]
            }));
            setQuiz(quizWithOptions)
            setCurrentQuestion(0)
        } catch (error) {
            // console.log(error);
        }
    }

    async function onSubmit() {
        try {
            const ans = Object.keys(answers).map(key => ({
                id: key,
                answer: answers[key]
            }));
            const res = await QuizService.submitAnswer(id, ans)
            // console.log(res);
            navigate("/quiz-result", { state: res })
        } catch (error) {
            Dialogs.showAlert(error);
        }
    }
}

function QuestionCard({ q, handleAnswerChange, selectedOption, key }) {
    console.log(selectedOption)
    return (<div className='p-10 flex-1'>
        <p className='text-left'>{q.question_text}</p>
        <div className="max-w-xl mx-auto my-5 p-5">
            {q.options.map((e) => (
                <div key={e.id} className={`option flex items-center my-2 p-5 rounded-md  ${selectedOption == e.value ? 'bg-orange-400' : 'bg-orange-100'}`}>
                    <input
                        checked={e.value === selectedOption}
                        type="radio"
                        value={e.value}
                        name={q.id}
                        id={`${q.id}-${e.value}`}
                        onChange={() => handleAnswerChange(q.id, e.value)}
                        className="mr-2 transform scale-150 accent-orange-600"
                    />
                    <label htmlFor={`${q.id}`} className="text-lg cursor-pointer">{e.label}</label></div>
            ))}</div></div>);
}

export default TakeQuizPage