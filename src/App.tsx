import { useState } from 'react';
import './App.css';
import { TextField } from './components/TextField';
import { Autocomplete } from './components/Autocomplete';
import { useAsyncCall } from './hooks/useAsyncCall';
import { callRestCountriesApi } from './utils/RestCountries';
// import { callSimulatedRestCountriesApi } from './utils/SimulatedAsyncCall';

function App() {
  const [selectedValue, setSelectedValue] = useState<string>();
  const { data, loading, setParams, error } =
    useAsyncCall<string>(callRestCountriesApi);

  return (
    <>
      <span>selected value: {selectedValue}</span>
      <Autocomplete
        options={data}
        loading={loading}
        error={!!error}
        onInputChange={str => setParams(str)}
        // value={'Paraguay'}
        onOptionSelected={opt => setSelectedValue(opt)}
        renderInput={params => (
          <TextField
            id="autocomplete1"
            labelText="Autocomplete"
            placeholder="Please enter country name"
            {...params}
          ></TextField>
        )}
      />
    </>
  );
}

export default App;
