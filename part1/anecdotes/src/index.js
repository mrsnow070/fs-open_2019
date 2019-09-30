import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ click, text }) => <button onClick={click}>{text}</button>;

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const [maxVotes, setMaxVotes] = useState(0);

    useEffect(() => {
        setMaxVotes(votes.indexOf(Math.max(...votes)));
    }, [votes])

    const nextAnecdote = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        let current = Math.floor(Math.random() * (max - min + 1)) + min;
        if (current === selected) {
            nextAnecdote(min, max);
        } else {
            setSelected(current);
        }
    };

    const vote = (current) => {
        let tempArray = [...votes];
        tempArray[current] += 1;
        setVotes([...tempArray]);
    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <p>{`has votes ${votes[selected]}`}</p>
            <div>
                <Button click={() => vote(selected)} text="vote" />
                <Button click={() => nextAnecdote(0, anecdotes.length - 1)} text="next anecdote" />
            </div>
            <h1>Anecdote with most votes</h1>
            {anecdotes[maxVotes]}
            <p>has {Math.max(...votes)} votes</p>
        </div >
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)