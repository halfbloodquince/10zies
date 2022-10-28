import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Clock from './components/Clock'



function App() {

  // localStorage.clear()

  const [dice, setDice] = useState(startingMessage())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [topScore, setTopScore] = useState(JSON.parse(localStorage.getItem("topscore")) || "--")
  const [topTime, setTopTime] = useState(JSON.parse(localStorage.getItem("toptime")) || 0)
  //clock
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
    
  useEffect(() => {
      let firstValue = dice[0].value
      if (dice.every(die => die.isHeld && die.value == firstValue)) {
        setTenzies(true)
      }

  }, [dice])


  useEffect(() => {
    if(count > 0 && !tenzies){
    setTimerOn(true)
    }
    else if (tenzies) {
      setTimerOn(false)
    }
    else if (count===0) {
      setTime(0)
    }
  })

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
          setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
        clearInterval(interval)
    }
    return () => clearInterval(interval) 
    //clean up function ^
  }, [timerOn])

    useEffect(() => {
      if (count == 0) {
        setDice(startingMessage())
      }
    },[count])



  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function startingMessage() {
    const startWords = "PRESSSTART".split("")
    const startingDice = []
    for (let i=0; i<10; i++) {
      startingDice.push({
        value: startWords[i],
        isHeld:false,
        id: nanoid()
      })
    } return startingDice
  }


  function allNewDice() {
    const newDice = []
    for (let i=0; i<10; i++) {
      newDice.push(generateNewDie())
    } 
    return newDice
  }

 
  

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
        
    }))
        setCount(count + 1)
  }
    else {
      setDice(allNewDice())
      setTenzies(false)
      setCount(0)
    }
  }

  useEffect(() => {
    if (tenzies) { 
      if (count < topScore || topScore === "--") {
        localStorage.setItem("topscore", JSON.stringify(count))}
        setTopScore(count)

    }
  })

  useEffect(() => {
    if (tenzies) {
      if (topTime ==0) {
        localStorage.setItem("toptime", JSON.stringify(time))
        setTopTime(time)
      }
      else if (time < topTime) {
        localStorage.setItem("toptime", JSON.stringify(time))
        setTopTime(time)
      }
    }
  })

  function holdDice(id) {
    if (count > 0){
    setDice(oldDice => oldDice.map((oldDie) => {
       return oldDie.id === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie
       }
    ))
  }
}


  const diceValues = dice.map((die) => <Die count={count} value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <div className="main">
 
      <div className="inner--border">
        <div className="inner--main">
          <div className="title--box"><h4 className='title--text'>Tenzies</h4></div>
        {tenzies && 
                    <Confetti width={window.innerWidth} initialVelocityY={30} />}
          <div className="dice--grid">
            {diceValues}
          </div>
          <button style={{backgroundColor: tenzies ? "#3b0e56" : "#8c3dbd"}} className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : count == 0 ? "Start" : "Roll"}</button>
        </div>
        <div className="score">
          <div className="score--1">
            <div className="score--count">Count : </div>
            <div className="count--1">{count}</div>
          </div>
          <div className="score--2">
            <div className="topscore">Top Score : </div>
            <div className="count--2">{topScore}</div>
          </div>
        </div>
        <div className="timer">
          <Clock time={time} topTime={topTime}/>
        </div>
      </div>
      {/* <div className="scoreboard">Scoreboard</div> */}
    </div>
  )
}

export default App
