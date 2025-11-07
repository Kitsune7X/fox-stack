import { useState } from "react";

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Need to write function to set how many time each button is clicked
  // Depend on what button, accumulate score

  // Set click value
  const setClick = (feedback) => {
    console.log(`good: ${good}, bad: ${bad}, neutral: ${neutral}`)
    // Practice using Ternary operator
    return feedback === "good" ? setGood(good + 1)
          : feedback === "neutral" 
            ? setNeutral(neutral + 1)
            : setBad(bad + 1)
  } 

  return (
    <>
    <div>
    <Header header = "give feedback" />
    <Button onClick={() => setClick("good")} text="good" />
    <Button onClick={() => setClick("neutral")} text="neutral" />
    <Button onClick={() => setClick("bad")} text="bad" />
    </div>
    <Header header = "statistics" />
    <DisplayStat good={good} neutral={neutral} bad={bad} />
    </>
  )
};

export default App;

// ------------------------
// Components
// ------------------------

// ---------- Header ----------
const Header = ({header}) => <h2>{header}</h2>


// ---------- Buttons ----------
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// ---------- Display Stats ----------
const DisplayStat = ({good, neutral, bad}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}