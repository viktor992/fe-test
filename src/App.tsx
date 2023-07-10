import { useState } from 'react';
import './App.css';
import { TextField } from './components/TextField';
import { Autocomplete } from './components/Autocomplete';
import { useAsyncCall } from './hooks/useAsyncCall';
import { callRestCountriesApi } from './utils/RestCountries';
import { callSimulatedRestCountriesApi } from './utils/SimulatedAsyncCall';

function App() {
  return (
    <>
      <h1>Autocomplete Demo</h1>
      <AutocompleteDemo
        title="Using External Rest API"
        fetcher={callRestCountriesApi}
      />
      <AutocompleteDemo
        title="Simulated Rest API Call"
        fetcher={callSimulatedRestCountriesApi}
      />
    </>
  );
}

interface AutocompleteDemoProps {
  title?: string;
  fetcher: (params: string) => Promise<string[]>;
}

export const AutocompleteDemo: React.FC<AutocompleteDemoProps> = ({
  title,
  fetcher,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>();
  const { data, loading, setParams, error } = useAsyncCall<string, string>(
    fetcher,
  );

  return (
    <>
      <h2>{title}</h2>
      <p>Selected value: {selectedValue}</p>
      <Autocomplete
        options={data}
        loading={loading}
        error={!!error}
        onInputChange={str => setParams(str)}
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
};

export default App;
