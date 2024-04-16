import React from "react";

export default function StartQuiz(props) {
    return(
        <div className="start--quiz-wrapper">
            <img className="start--react" src="/react.svg" />
            <img className="start--vite" src="/vite.svg" />
            <h1>Quizzical</h1>
            <p>Sush1sui's Solo Project (Scrimba Last Part)</p>
            <button onClick={props.setStartQuiz}>
                <h3>Start Quiz</h3>
            </button>
        </div>
    )
}