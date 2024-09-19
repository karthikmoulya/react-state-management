import { useEffect, useState } from 'react';

function StopWatch() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Time: {time}</div>;
}

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('/names.json')
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedNameDetails, setSelectedNameDetails] = useState(null);

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((res) => res.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <div className='App'>
      <StopWatch />
      <div>
        {names.map((name) => (
          <button key={name} onClick={() => onSelectedNameChange(name)}>
            {name}
          </button>
        ))}
      </div>
      <div>{JSON.stringify(selectedNameDetails)}</div>
    </div>
  );
}

export default App;
