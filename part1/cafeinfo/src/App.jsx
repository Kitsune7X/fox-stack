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
    // Practice using Ternary operator
    feedback === "good" ? console.log("Good feedback")
    : feedback === "neutral" 
      ? console.log("Neutral feedback")
      : console.log("Bad feedback")
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