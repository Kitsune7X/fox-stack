const App = () => {
  // Static course definition used to feed child components
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

  // Render the header, content list, and total summary
  return <Course course={course} />;
};

export default App;

// ==============================
// * Components — START
// ==============================
// ---------- Course component ----------
// From React docs https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
// When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`.
const Course = ({ course }) => {
  console.log(course);
  console.log(typeof course);

  // Rendering the Header component
  return (
    <div>
      <Header key={course.id} name={course.name} />
    </div>
  );
};

// ---------- Header component ----------
// Deconstruct prop object into `name` primitive
const Header = ({ name }) => <h1>{name}</h1>;

// ---------- Content component ----------
// Passing an array as parameter method
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

// ---------- Total component ----------
const Total = ({ parts }) => {
  // Calculate the total number of exercises across all parts
  const totalExercises = parts.reduce((acc, cur) => acc + cur.exercises, 0);

  // Present the aggregate exercise count to the user
  return <p>Number of exercises {totalExercises}</p>;
};

// ==============================
// * Components — END
// ==============================
