import { useState } from 'react';
import './App.css';

const data = [
  {
    id: 1,
    question: 'React is the library of which language?',
    answer: 'JavaScript',
    married: false,
    color: '#E0D8FC'
  },
  {
    id: 2,
    question: 'Who is the presidet of USA?',
    answer: 'Joe Biden',
    married: false,
    color: '#DBFDD6'
  },
  {
    id: 3,
    question: 'How many characters are there in a PAN?',
    answer: 10,
    married: false,
    color: '#FFBE59'
  },
  {
    id: 4,
    question: 'Maria Sharapova is related to which game?',
    answer: 'Tennis',
    married: false,
    color: '#D3B9FB'
  },
  {
    id: 5,
    question: 'Who is the winner of cricket world cup 2023?',
    answer: 'India',
    married: false,
    color: '#F1C5E0'
  }
]

function App() {
  return <>
    <h1>Flashcard</h1>
    <div className='box'>
      <Flashcard />
    </div></>
}

function Flashcard() {
  const [selecedId, setSelectedId] = useState(null);
  function clickHandler(id) {
    setSelectedId(id !== selecedId ? id : null)
  }

  return <>
    {
      data.map((dat) =>
        <div className='box-data' style={{ backgroundColor: dat.color }} key={dat.id} onClick={() => clickHandler(dat.id)}>
          <h3>Q: {dat.question}</h3>
          <p className={dat.id === selecedId ? 'active' : ''}>{dat.id === selecedId ? `Ans: ${dat.answer}` : ''}</p>
        </div>)
    }</>
}

export default App;
