const Header = (props) => {
  return(
    <div className="header">
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
  <div className="part">
    <p>
      {props.name} {props.exercise}
    </p>
  </div>
  )
}

const Content = (props) => {
  console.log(props.parts[0]);
  return(
    <div className="content">
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  ) 
}

const Total = (props) => {
  return(
    <div className="total">
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div className="App">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App