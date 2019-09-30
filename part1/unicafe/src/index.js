import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => <h1>{header}</h1>
const Button = ({ click, text }) => <button onClick={click}>{text}</button>;

const Statistic = ({ value, text }) => <tr><td>{text}</td><td> {value}</td></tr>
const Statistics = ({ good, neutral, bad, stat }) => {
    const calcAverage = (arr) => {
        if (arr.length > 0) {
            return (arr.reduce((total, score) => total + score)) / arr.length
        }
        return 0
    }

    const calcPositive = (positiveCount, maxCount) => {
        if (maxCount > 0) {
            return (positiveCount / maxCount) * 100;
        }
        return 0;
    }

    return (
        <table>
            <tbody>
                {stat.scores.length >= 1 ? <>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="all" value={stat.scores.length} />
                    <Statistic text="average" value={calcAverage(stat.scores)} />
                    <Statistic text="positive" value={`${calcPositive(good, stat.scores.length)} %`} /></>
                    : <tr><td>No feedback given</td></tr>}
            </tbody>
        </table>
    )
}


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [statistic, setstatistic] = useState({
        scores: [],
        positive: 0
    });

    const handleClick = (state, cb, score) => {
        return () => {
            setstatistic({
                ...statistic,
                scores: statistic.scores.concat(score)
            });
            return cb(state + 1);
        };
    }

    return (
        <div>
            <Header header="give feedback" />

            <Button click={handleClick(good, setGood, 1)} text="good" />
            <Button click={handleClick(neutral, setNeutral, 0)} text="neutral" />
            <Button click={handleClick(bad, setBad, -1)} text="bad" />

            <Header header="statistic" />
            <Statistics good={good} neutral={neutral} bad={bad} stat={statistic} />

        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)