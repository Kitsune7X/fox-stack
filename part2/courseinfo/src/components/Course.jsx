// ---------- Courses component ----------
// Descontruct props into `courses`
const Course = ({ courses }) => {
  // `courses` is an array of object. Map the `courses` array to
  // a new array where each item `course` is an object which then be passed
  // Header, Content and Total as parameter
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
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

  // Present the total exercise count to the user
  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
};

export default Course;
