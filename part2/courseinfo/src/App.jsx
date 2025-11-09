const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  // Render the header, content list
  return <Course course={course} />;
};

export default App;

// ==============================
// * Components — START
// ==============================
// ---------- Course component ----------
// Descontruct props into `course`
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

// ---------- Header component ----------
// Deconstruct prop object into `name`
const Header = ({ name }) => <h1>{name}</h1>;

// ---------- Content component ----------
// Deconstruct props into `parts`. `parts` is
// an array of objects
// From React docs https://react.dev/learn/rendering-lists
const Content = ({ parts }) => {
  return (
    // Map the array into a new array containing name and number of exercises
    <div>
      {parts.map((item) => (
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      ))}
    </div>
  );
};

// ---------- Part component ----------
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

// ---------- Total component ----------
const Total = ({ parts }) => {
  // Calculate the total number of exercises across all parts
  const totalExercises = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  // Present the aggregate exercise count to the user
  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
};

// ==============================
// * Components — END
// ==============================
