import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Clock from './components/Clock'
import Rules from './components/Rules'
import Scores from './components/Scores'

import restart from "./images/restart.png"
import rules from "./images/rules.png"
import scores from "./images/scores.png"


function App() {
//this is a test
  // localStorage.clear()

  const [dice, setDice] = useState(startingMessage())
  const [tenzies, setTenzies] = useState(false)
  const [count, setCount] = useState(0)
  const [topScore, setTopScore] = useState(JSON.parse(localStorage.getItem("newscore")) || "--")
  const [topTime, setTopTime] = useState(JSON.parse(localStorage.getItem("toptime")) || 0)
  const [allScores, setAllScores] = useState(JSON.parse(localStorage.getItem("allscores")) || [])
  //clock
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  //buttons
  const [rulesOn, setRulesOn] = useState(false)
  const [scoresOn, setScoresOn] = useState(false)
  // const [reset, setReset] = useState(false) 

  


  function resetButton() {
    setDice(startingMessage())
    setTime(0)
    setTimerOn(false)
    setTenzies(false)
    setCount(0)
    setRulesOn(false)
    setScoresOn(false)
  }

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
      let finalTime = time
    }
    else if (count===0) {
      setTime(0)
    }
  }, )

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

  // const scrollBox = document.getElementByClassName("container")

  useEffect(() => {
    if (tenzies) {
      setAllScores(old => [...old, time].sort(function(a, b) {return a - b}))
    }
  },[timerOn])

  useEffect(() => {
    localStorage.setItem("allscores", JSON.stringify(allScores))
  },[allScores])


    useEffect(() => {
      if (count == 0) {
        setDice(startingMessage())

      }
    },[count])




  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
        delay:0
    }
}

  function startingMessage() {
    const startWords = "PRESSSTART".split("")
    const startingDice = []
    for (let i=0; i<10; i++) {
      startingDice.push({
        value: startWords[i],
        isHeld:false,
        id: nanoid(),
        delay: 0.04*i
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
      if (count < Number(topScore) || topScore === "--") {
        localStorage.setItem("newscore", JSON.stringify(count))
        setTopScore(count)
        }

    } 
  }, [tenzies])

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
  }, [timerOn])




  function holdDice(id) {
    if (count > 0){
    setDice(oldDice => oldDice.map((oldDie) => {
       return oldDie.id === id ? {...oldDie, isHeld: !oldDie.isHeld} : oldDie
       }
    ))
  }
}

  function toggleRules() {
    setRulesOn(rulesOn => !rulesOn) 
  }


  function toggleScores() {
    setScoresOn(scoresOn => !scoresOn) 
  }

  let innerWidth = window.innerWidth
  let innerHeight = 1.5 * window.innerHeight


  const diceValues = dice.map((die) => <Die count={count} value={die.value} key={die.id} isHeld={die.isHeld} delay={die.delay} holdDice={() => holdDice(die.id)} />)


  // style= {{minHeight: scoresOn || rulesOn ? "900px" : "300px"}}

  return (
    <div className="main" >
      <div className="features">
        <Rules rulesOn={rulesOn} />
        <Scores scoresOn={scoresOn} allScores={allScores} />
      </div>
      <div className='confetti--container'>
        {tenzies && <Confetti width={innerWidth} height={innerHeight} initialVelocityY={30} />}
      </div>
      <div className="container">
      <div className="inner--border">
      <div className="score">
          <div className="score--1">
            <div className="score--count">Count : </div>
            <div className="count--1">{count}</div>
          </div>
          <div className="score--2">
            <div className="top--score">Record Count : </div>
            <div className="count--2">{topScore}</div>
          </div>
        </div>
        <div className="inner--main">
          <div className="title--box"><h4 className='title--text'>Tenzies</h4></div>


          <div className="dice--grid">
            {diceValues}
          </div>
          <button style={{backgroundColor: tenzies ? "#3b0e56" : "#8c3dbd"}} className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : count == 0 ? "Start" : "Roll"}</button>
        </div>
        <div className="timer">
          <Clock time={time} topTime={topTime}/>
        </div>

      </div>
      <div className="gapbox"></div>
      <div className="buttons">
          <button className="button--rules" onClick={toggleRules}>
            <img style={rulesOn ? {filter:"invert(1)", width:"26px"} : {}} className='icon left' src={rules} alt="" />
          </button>
          <button className="button--high--scores">
            <img style={scoresOn ? {filter:"invert(1)", width:"33px"} : {}} className='icon middle' src={scores} onClick={toggleScores} alt="" />
          </button>
          <button className="button--refresh">
            <img className='icon right' src={restart} onClick={resetButton} alt="" />
          </button>
        </div>
    </div>
    </div>
  )
}

export default App
