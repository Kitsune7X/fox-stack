const App = () => {
  // Static course definition used to feed child components
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

  // Render the header, content list, and total summary
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
  // Transform each part into a paragraph element
  const partList = parts.map((item) => (
    // Add key as React need key
    <p key={item.name}>
      {item.name} {item.exercises}
    </p>
  ));

  // Inject the generated list into the DOM
  return <div>{partList}</div>;
};

// Total component
const Total = ({ parts }) => {
  // Calculate the total number of exercises across all parts
  const totalExercises = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  // Present the aggregate exercise count to the user
  return <p>Number of exercises {totalExercises}</p>;
};
