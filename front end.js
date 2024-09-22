import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://your-backend-url/bfhl', JSON.parse(jsonInput));
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting JSON:', error);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const filteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    if (selectedOptions.includes('Numbers')) filtered.numbers = response.numbers;
    if (selectedOptions.includes('Alphabets')) filtered.alphabets = response.alphabets;
    if (selectedOptions.includes('Highest lowercase alphabet')) filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return filtered;
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>
          <input type="checkbox" value="Numbers" onChange={handleOptionChange} /> Numbers
        </label>
        <label>
          <input type="checkbox" value="Alphabets" onChange={handleOptionChange} /> Alphabets
        </label>
        <label>
          <input type="checkbox" value="Highest lowercase alphabet" onChange={handleOptionChange} /> Highest lowercase alphabet
        </label>
      </div>
      <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
    </div>
  );
}

export default App;
