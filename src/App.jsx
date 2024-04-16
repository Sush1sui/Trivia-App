import React, { useState, useEffect } from "react";
import StartQuiz from "./components/StartQuiz";
import QuizPage from "./components/QuizPage";
import { getRng } from "./utils";

export default function App() {
    const [startQuiz, setStartQuiz] = useState(false);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [rngAnswerInsert, setRngAnswerInsert] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        async function fetchQuestionnaires() {
            setIsLoading(true);
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setQuestionnaires(data.results);

                const arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(getRng(0, 4));
                }
                setRngAnswerInsert(arr);
                setIsFetched(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (!isFetched) {
            fetchQuestionnaires();
        }
    }, [isFetched]);

    if (isLoading) {
        return (
            <div className="loading--message">
                <h4>
                    Loading
                    <span id="dot1">.</span>
                    <span id="dot2">.</span>
                    <span id="dot3">.</span>
                </h4>
            </div>
        );
    }

    return (
        <main>
            {!startQuiz ? (
                <StartQuiz setStartQuiz={() => setStartQuiz(true)} />
            ) : (
                <QuizPage quizData={questionnaires} rngAnswerInsert={rngAnswerInsert} />
            )}
        </main>
    );
}
