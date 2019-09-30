import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => <h1>{header}</h1>
const Button = ({ click, text }) => <button onClick={click}>{text}</button>;

const Counter = ({ count, text }) => <p>{text} {count}</p>


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (state, cb) => () => cb(state + 1)

    return (
        <div>
            <Header header="Give feedback" />

            <Button click={handleClick(good, setGood)} text="good" />
            <Button click={handleClick(neutral, setNeutral)} text="neutral" />
            <Button click={handleClick(bad, setBad)} text="bad" />

            <Header header="statistic" />
            
            <Counter text="good" count={good} />
            <Counter text="neutral" count={neutral} />
            <Counter text="bad" count={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)