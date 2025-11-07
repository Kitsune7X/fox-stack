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
  const calcPositivePercent = () => {
    const per =
      (good / countFeedback()) * 100 ? (good / countFeedback()) * 100 : 0;
    return per;
  };

  return (
    <>
      <div>
        <Header header="give feedback" />
        <Button onClick={() => handleFeedback("good")} text="good" />
        <Button onClick={() => handleFeedback("neutral")} text="neutral" />
        <Button onClick={() => handleFeedback("bad")} text="bad" />
      </div>
      <Header header="statistics" />
      <Statistics
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

// ---------- Statistics ----------
const Statistics = ({ good, neutral, bad, all, avg, percent }) => {
  return all ? (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="avg" value={avg} />
      <StatisticLine text="positive" value={percent} />
    </div>
  ) : (
    <div>
      <p>No feedback given</p>
    </div>
  );
};

// ---------- Statistic Line ----------
const StatisticLine = ({ text, value }) => {
  return text === "positive" ? (
    <p>
      {text} {value} %
    </p>
  ) : (
    <p>
      {text} {value}
    </p>
  );
};
