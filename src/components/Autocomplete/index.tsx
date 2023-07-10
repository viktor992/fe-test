import React, {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import autocompleteStyles from './autocomplete.module.scss';
import { HighlightedLabel } from '../HighlightedLabel';

interface AutocompleteProps {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  options?: string[];
  onOptionSelected?: (option: string) => void;
  value?: string;
  renderInput: (props: {
    onClick: MouseEventHandler<HTMLInputElement>;
    onFocus: FocusEventHandler<HTMLInputElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string | number | readonly string[] | undefined;
    onBlur: FocusEventHandler<HTMLInputElement>;
  }) => ReactNode;
  onInputChange?: (str: string) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  loading,
  error,
  errorMessage = "Error: Couldn't fetch data",
  options = [],
  onOptionSelected = () => null,
  value = '',
  renderInput = () => null,
  onInputChange = () => null,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [optionSelected, setOptionSelected] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue && optionSelected !== inputValue) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [inputValue, optionSelected]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      data-testid="autocomplete-container"
      className={autocompleteStyles['container']}
    >
      {renderInput({
        onClick: () => {
          if (inputValue && !optionSelected) {
            setOpen(true);
          }
        },
        onFocus: () => {
          if (inputValue && !optionSelected) {
            setOpen(true);
          }
        },
        onChange: e => {
          setInputValue(e.target.value);
          onInputChange(e.target.value);
          setOptionSelected('');
          onOptionSelected('');
        },
        value: inputValue,
        onBlur: () => {
          setOpen(false);
        },
      })}

      {open && (
        <div
          data-testid="autocomplete-options"
          className={autocompleteStyles['options']}
        >
          {error && <>{errorMessage}</>}
          {!error && loading && <>Loading...</>}
          {!error && !loading && (
            <>
              {options?.length ? (
                <>
                  {options.map(opt => {
                    return (
                      <div
                        data-testid="autocomplete-option"
                        key={opt}
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => {
                          setOptionSelected(opt);
                          onOptionSelected(opt);
                          setInputValue(opt);
                          setOpen(false);
                        }}
                        className={autocompleteStyles['options__item']}
                      >
                        <HighlightedLabel
                          value={opt}
                          highlightedText={inputValue}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>No Data</>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
