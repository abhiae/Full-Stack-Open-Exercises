import { useState } from "react";
//components
//Title
const Title = (props) => {
  return <h1>{props.title}</h1>;
};
// Buttons
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
// StatisticLine
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.count} </td>
    </tr>
  );
};
// Statistics
const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" count={good} />
          <StatisticLine text="neutral" count={neutral} />
          <StatisticLine text="bad" count={bad} />
          <StatisticLine text="all" count={all} />
          <StatisticLine
            text="average"
            count={parseFloat((good - bad) / all).toFixed(2)}
          />
          <StatisticLine
            text="positive"
            count={parseFloat((good / all) * 100).toFixed(2) + "%"}
          />
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleStateChange = (newState) => () => {
    if (newState === "good") {
      setGood(good + 1);
      setAll(all + 1);
    } else if (newState === "neutral") {
      setNeutral(neutral + 1);
      setAll(all + 1);
    } else if (newState === "bad") {
      setBad(bad + 1);
      setAll(all + 1);
    }
  };

  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={handleStateChange("good")} text="good" />
      <Button handleClick={handleStateChange("neutral")} text="neutral" />
      <Button handleClick={handleStateChange("bad")} text="bad" />
      <Title title="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
