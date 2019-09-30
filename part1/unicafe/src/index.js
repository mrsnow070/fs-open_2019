import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => <h1>{header}</h1>
const Button = ({ click, text }) => <button onClick={click}>{text}</button>;

const Statistic = ({ value, text }) => <p>{text} {value}</p>
const Statistics = (props) => {
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
    console.log(props.stat.scores)
    return (
        <>
            <Header header="statistic" />
            {props.stat.scores.length >= 1 ? <>
                <Statistic text="good" value={props.good} />
                <Statistic text="neutral" value={props.neutral} />
                <Statistic text="bad" value={props.bad} />
                <Statistic text="all" value={props.stat.scores.length} />
                <Statistic text="average" value={calcAverage(props.stat.scores)} />
                <Statistic text="positive" value={`${calcPositive(props.good, props.stat.scores.length)} %`} /></>
                : <p>No feedback given</p>}

        </>
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
            // calcAverage();
            return cb(state + 1);
        };
    }

    // const calcAverage = (cb) => {

    //     let score = average.reduce((total, score) => total + score);
    //     console.log("Average ", score)

    // }

    return (
        <div>
            <Header header="give feedback" />

            <Button click={handleClick(good, setGood, 1)} text="good" />
            <Button click={handleClick(neutral, setNeutral, 0)} text="neutral" />
            <Button click={handleClick(bad, setBad, -1)} text="bad" />

            <Statistics good={good} neutral={neutral} bad={bad} stat={statistic} />

        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)