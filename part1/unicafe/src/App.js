import { useState } from 'react'
import './App.css'

const StatisticLine = (props) =>{
  return(
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {

  if(props.good>0 || props.neutral>0 || props.bad>0){
    return(
      <div className="statistics">
        <StatisticLine  text="good" value ={props.good} />
        <StatisticLine  text="neutral" value ={props.neutral} />
        <StatisticLine  text="bad" value ={props.bad} />
        <StatisticLine  text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine  text="all" value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
        <StatisticLine  text="all" value={(props.good/(props.good + props.neutral + props.bad))*100} />
      </div>
    )
  }
  else{
    return(
      <div className="beforestats">
        No FeedBack Given
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div className='App'>
      <div className="header">
        <h1>Give Feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App