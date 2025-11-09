const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  // Render the header, content list
  return <AllCourses courses={courses} />;
};

export default App;

// ==============================
// * Components — START
// ==============================
// ---------- All Courses component ----------
// Descontruct props into `courses`
const AllCourses = ({ courses }) => {
  // `courses` is an array of object. Map the `courses` array to
  // a new array where each item `course` is an object which then be passed
  // to Course component as parameter
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

// ---------- Single Course Component ----------
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
    <ul>
      {parts.map((item) => (
        <Part key={item.id} name={item.name} exercises={item.exercises} />
      ))}
    </ul>
  );
};

// ---------- Part component ----------
const Part = ({ name, exercises }) => (
  <li>
    {name} {exercises}
  </li>
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
