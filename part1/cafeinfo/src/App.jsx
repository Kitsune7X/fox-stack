import { useState } from "react";

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // Total points
  const [totalPoint, setTotalPoint] = useState(0);

  // `handleFeedback()` that take what user click as argument
  // and update feedback value accordingly
  const handleFeedback = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1);
      setTotalPoint(totalPoint + 1);
    } else if (feedback === "neutral") setNeutral(neutral + 1);
    else {
      setBad(bad + 1);
      setTotalPoint(totalPoint - 1);
    }
  };

  // Calculate Total feedbacks
  const countFeedback = () => good + neutral + bad;

  // Calculate Average points
  const calcAvg = () => {
    const avg =
      totalPoint / (good + neutral + bad)
        ? totalPoint / (good + neutral + bad)
        : 0;
    return avg;
  };

  // Calculate positive percent
  const calcPositivePercent = () => (good / countFeedback()) * 100;

  return (
    <>
      <div>
        <Header header="give feedback" />
        <Button onClick={() => handleFeedback("good")} text="good" />
        <Button onClick={() => handleFeedback("neutral")} text="neutral" />
        <Button onClick={() => handleFeedback("bad")} text="bad" />
      </div>
      <Header header="statistics" />
      <DisplayStat
        good={good}
        neutral={neutral}
        bad={bad}
        all={countFeedback()}
        avg={calcAvg()}
        percent={calcPositivePercent()}
      />
    </>
  );
};

export default App;

// ------------------------
// Components
// ------------------------

// ---------- Header ----------
const Header = ({ header }) => <h2>{header}</h2>;

// ---------- Buttons ----------
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// ---------- Display Stats ----------
const DisplayStat = ({ good, neutral, bad, all, avg, percent }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {avg}</p>
      <p>percent {percent} %</p>
    </div>
  );
};
