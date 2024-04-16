import React, { useState, useEffect } from "react";
import { shuffleArray } from "../utils";
import githubIcon from '/github.svg'
import leetcode from '/leetcode.svg'
import Confetti from 'react-confetti'

export default function QuizPage(props) {
    const [quizData, setQuizData] = useState(props.quizData);
    const [answers, setAnswers] = useState(quizData.map((quiz) => ({
        question: quiz.question,
        answer: "",
        correct_answer: quiz.correct_answer
    })));
    const [score, setScore] = useState(0)
    const [isScoreShown, setIsScoreShown] = useState(false)
    
    const quizElements = quizData.map((quiz, index) => {
        if (quiz.type === "multiple") {
            const choices = [...quiz.incorrect_answers];
            choices.splice(props.rngAnswerInsert[index], 0, quiz.correct_answer);
            return (
                <div className="question multiple" key={index}>
                    <h3 dangerouslySetInnerHTML={{ __html: quiz.question }} />
                    <div className="choices">
                        {choices.map((choice, i) => (
                            <button
                                value={choice}
                                key={i}
                                className="choice"
                                onClick={() => inputAnswer(quiz.question, choice)}
                                style={
                                    { 
                                        backgroundColor: isScoreShown && answers[index].answer === choice && choice !== quiz.correct_answer ? '#F8BCBC' :
                                                        isScoreShown && answers[index].answer !== choice && choice === quiz.correct_answer ? '#94D7A2' :
                                                        answers[index].answer === choice ? '#94D7A2'  
                                                        : "",
                                        borderColor: isScoreShown && answers[index].answer === choice && choice !== quiz.correct_answer ? '#F8BCBC' :
                                                    isScoreShown && answers[index].answer !== choice && choice === quiz.correct_answer ? '#94D7A2' :
                                                    answers[index].answer === choice ? '#94D7A2'  
                                                    : "",
                                    }
                                }
                            >
                                <b dangerouslySetInnerHTML={{ __html: choice }} />
                            </button>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="question boolean" key={index}>
                    <h3 dangerouslySetInnerHTML={{ __html: quiz.question }} />
                    <div className="choices">
                        <button
                            value={true}
                            className="choice"
                            onClick={() => inputAnswer(quiz.question, "True")}
                            style={
                                { 
                                    backgroundColor: isScoreShown && answers[index].answer === 'True' && 'True' !== quiz.correct_answer ? '#F8BCBC' :
                                                    isScoreShown && answers[index].answer !== 'True' && 'True' === quiz.correct_answer ? '#94D7A2' :
                                                    answers[index].answer === 'True' ? '#94D7A2'  
                                                    : "",
                                    borderColor: isScoreShown && answers[index].answer === 'True' && 'True' !== quiz.correct_answer ? '#F8BCBC' :
                                                isScoreShown && answers[index].answer !== 'True' && 'True' === quiz.correct_answer ? '#94D7A2' :
                                                answers[index].answer === 'True' ? '#94D7A2'  
                                                : "",
                                }
                            }
                        >
                            <b dangerouslySetInnerHTML={{ __html: "True" }} />
                        </button>
                        <button
                            value={false}
                            className="choice"
                            onClick={() => inputAnswer(quiz.question, "False")}
                            style={
                                { 
                                    backgroundColor: isScoreShown && answers[index].answer === 'False' && 'False' !== quiz.correct_answer ? '#F8BCBC' :
                                                    isScoreShown && answers[index].answer !== 'False' && 'False' === quiz.correct_answer ? '#94D7A2' :
                                                    answers[index].answer === 'False' ? '#94D7A2'  
                                                    : "",
                                    borderColor: isScoreShown && answers[index].answer === 'False' && 'False' !== quiz.correct_answer ? '#F8BCBC' :
                                                isScoreShown && answers[index].answer !== 'False' && 'False' === quiz.correct_answer ? '#94D7A2' :
                                                answers[index].answer === 'False' ? '#94D7A2'  
                                                : "",
                                }
                            }
                        >
                            <b dangerouslySetInnerHTML={{ __html: "False" }} />
                        </button>
                    </div>
                </div>
            );
        }
    })

    useEffect(()=> {
        let newScore=0
        answers.forEach(answer => {
            if (answer.answer === answer.correct_answer) {
                newScore++;
            }
        });
        setScore(newScore)
    }, [answers])

    function inputAnswer(q, a) {
        if(!isScoreShown) {
            setAnswers((prevAnswers) =>
                prevAnswers.map((prevAnswer) => {
                    if (prevAnswer.question === q) {
                        return { ...prevAnswer, answer: a };
                    } else {
                        return { ...prevAnswer };
                    }
                })
            );
        }
    }

    function showScores(e) {
        setIsScoreShown(prev => !prev)
        if(e.target.innerText==='Play Again') {
            e.target.textContent='Check Answers'
            e.target.style.fontWeight='bold'
            setAnswers(quizData.map((quiz) => ({
                question: quiz.question,
                answer: "",
                correct_answer: quiz.correct_answer
            })))
        } else {
            e.target.textContent='Play Again'
            e.target.style.fontWeight='bold'
        }
    }

    return (
        <div className="quiz--page-wrapper">
            {
                isScoreShown && score===10 &&
                <Confetti width={window.innerWidth} height={window.innerHeight} />
            }
            <header className="quiz--header">
                <h1>Sush1sui's Trivia</h1>
                <h3>From <a href="https://opentdb.com/api_config.php" target="_blank">opentdb</a></h3>
            </header>
            <div className="quiz-body">
                {   
                    quizElements
                }
            </div>
            <div className="scoreboard-submit">
                {
                    isScoreShown &&
                    <div className="scoreboard">
                        {`You scored ${score}/10 answers`}
                    </div>
                }
                <button 
                    className="submit-answer-btn"
                    onClick={showScores}
                >
                    <b>Check Answers</b>
                </button>
            </div>
            <footer className="quiz--footer">
                <a href="https://github.com/Sush1sui" target="_blank">
                    <img src={githubIcon} />
                </a>
                <a href="https://leetcode.com/jpmercado57123/" target="_blank">
                    <img src={leetcode} />
                </a>
            </footer>
        </div>
    );
}
