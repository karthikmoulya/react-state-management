import { useEffect, useRef, useState } from 'react';

function App() {
  const inputRef = useRef(null);

  const idRef = useRef(1);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [names, setNames] = useState([
    {
      id: idRef.current++,
      name: 'Karthik',
    },
    {
      id: idRef.current++,
      name: 'Anu',
    },
  ]);

  const onAddName = () => {
    setNames([
      ...names,
      {
        id: idRef.current++,
        name: inputRef.current.value,
      },
    ]);
    inputRef.current.value = '';
  };

  return (
    <div>
      <div>
        {names.map((name) => (
          <div key={name.name}>
            {name.id} - {name.name}
          </div>
        ))}
      </div>
      <input type='text' ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
    </div>
  );
}

export default App;
