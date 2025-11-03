const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
};

export default App;

// Header component
// Deconstruct prop object into `name` primitive
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

// Content component
// From React docs https://react.dev/learn/passing-props-to-a-component
// When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`.

// Passing an array as method
// From React docs https://react.dev/learn/rendering-lists
const Content = ({ parts }) => {
  // Map the `parts` items into a new array of JSX node
  const partList = parts.map((item) => (
    // Add key as React needs key
    <p key={item.name}>
      {item.name} {item.exercises}
    </p>
  ));

  // Return `partList` wrapped in <div>
  return <div>{partList}</div>;
};

// Total component
const Total = ({ parts }) => {
  // Calculate the total exercise using reduce()
  const totalExercises = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  // Return <p> with totalExercises
  return <p>Number of exercises {totalExercises}</p>;
};
