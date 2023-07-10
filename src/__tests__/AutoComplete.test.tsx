import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Autocomplete } from '../components/Autocomplete';
import { TextField } from '../components/TextField';

const list = [
  'Panama',
  'Paraguay',
  'Spain',
  'Pakistan',
  'Nepal',
  'Palestine',
  'Japan',
  'Papua New Guinea',
  'Palau',
];

const renderAutocomplete = (
  options: string[],
  loading: boolean,
  error: boolean,
) => {
  const inputChangeHandler = jest.fn(() => null);
  const optionSelectedHandler = jest.fn(() => null);
  const component = render(
    <Autocomplete
      options={options}
      loading={loading}
      error={error}
      onInputChange={inputChangeHandler}
      onOptionSelected={optionSelectedHandler}
      renderInput={params => (
        <TextField
          id="autocomplete1"
          labelText="Autocomplete"
          placeholder="Please enter country name"
          {...params}
        ></TextField>
      )}
    />,
  );
  return { component, inputChangeHandler, optionSelectedHandler };
};

describe('Autocomplete component', () => {
  test("it shouldn't show the options container if the input is empty", () => {
    const { component } = renderAutocomplete([], false, false);

    const input = component.getByTestId('input');

    let options = component.queryByTestId('autocomplete-options');
    expect(options).not.toBeInTheDocument();

    fireEvent.click(input);
    options = component.queryByTestId('autocomplete-options');
    expect(options).not.toBeInTheDocument();
  });

  test('it should show the options container if the input has content', () => {
    const { component, inputChangeHandler } = renderAutocomplete(
      [],
      false,
      false,
    );

    const input = component.getByTestId('input');

    expect(inputChangeHandler).toBeCalledTimes(0);
    fireEvent.change(input, { target: { value: 'Pa' } });
    expect(inputChangeHandler).toBeCalledTimes(1);
    expect(inputChangeHandler).toBeCalledWith('Pa');

    let options = component.queryByTestId('autocomplete-options');
    expect(options).toBeInTheDocument();

    fireEvent.blur(input);
    options = component.queryByTestId('autocomplete-options');
    expect(options).not.toBeInTheDocument();
  });

  test('it should show the No Data message if there are not options', () => {
    const { component } = renderAutocomplete([], false, false);

    const input = component.getByTestId('input');

    fireEvent.change(input, { target: { value: 'Pa' } });

    const noData = component.getByText('No Data');
    expect(noData).toBeInTheDocument();
  });

  test('it should show the Loading message if the options container is open and the loading prop is true', () => {
    const { component } = renderAutocomplete([], true, false);

    const input = component.getByTestId('input');

    fireEvent.change(input, { target: { value: 'Pa' } });

    const loading = component.getByText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  test('it should show the error message if the options container is open and the error prop is true', () => {
    const { component } = renderAutocomplete([], false, true);

    const input = component.getByTestId('input');

    fireEvent.change(input, { target: { value: 'Pa' } });

    const error = component.getByText("Error: Couldn't fetch data");
    expect(error).toBeInTheDocument();
  });

  test('it should show options in the options container if the options prop is not empty', () => {
    const { component, optionSelectedHandler } = renderAutocomplete(
      list,
      false,
      false,
    );
    const input = component.getByTestId('input');
    fireEvent.change(input, { target: { value: 'Pa' } });
    const options = component.getAllByTestId('autocomplete-option');
    expect(options.length).toBe(9);

    fireEvent.click(options[0]);
    expect(optionSelectedHandler).toBeCalledWith('Panama');
  });
});
