import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  // Initialize an array filled with 0 that has the same
  // length as the anecdotes array length
  const votes = Array(anecdotes.length).fill(0);

  const [vote, setVote] = useState(votes);

  // ==============================
  // * Functions — START
  // ==============================

  // ---------- Create random index function ----------
  const createRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

  // ---------- Set random anecdotes ----------
  const setRandomAnecdotes = (arr) => setSelected(createRandomIndex(arr));

  // https://react.dev/reference/react/useState#updating-objects-and-arrays-in-state

  // ---------- Update vote count function ----------
  const updateVote = () => {
    // Create a copy of the vote state
    const copy = [...vote];

    // Since `selected` state indicate the index of the current item in the array,
    // we update the value of the item at that index in the array
    copy[selected] += 1;

    setVote(copy);
  };

  // ---------- Find index of highest vote function ----------
  // Find the max vote value with Math.max()
  // and then find the index of that value
  const findHighestVoteIndex = (arr) =>
    arr.findIndex((item) => item === Math.max(...arr));

  // ==============================
  // * Functions — END
  // ==============================

  return (
    <div>
      <Header text="Anecdote of the day" />
      <AnecdotesDisplay item={anecdotes[selected]} />
      <VotesDisplay item={vote[selected]} />
      <Button
        onClick={() => setRandomAnecdotes(anecdotes)}
        text="next anecdotes"
      />
      <Button onClick={() => updateVote()} text="Vote" />
      <Header text="Anecdote with most votes" />
      <AnecdotesDisplay item={anecdotes[findHighestVoteIndex(vote)]} />
      <VotesDisplay item={vote[findHighestVoteIndex(vote)]} />
    </div>
  );
};

export default App;

// -------------------------------------------------
// Components
// -------------------------------------------------
// ---------- Anecdotes display ----------
const AnecdotesDisplay = ({ item }) => <p>{item}</p>;

// ---------- Vote display ----------
const VotesDisplay = ({ item }) => <p>has {item} votes</p>;

// ---------- Header ----------
const Header = ({ text }) => <h2>{text}</h2>;

// ---------- Button ----------
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// -------------------------------------------------
// Optional function
// -------------------------------------------------
// The function below will return the array with random index directly

// // ---------- Filter out anecdotes from index ----------
// const createRandomAnecdotes = (arr) => {
//   // Create random index then find the item with that index
//   const idx = createRandomIndex(arr);
//   return arr.find((item) => arr.indexOf(item) === idx);
// };
