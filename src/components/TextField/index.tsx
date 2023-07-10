import React, { ReactNode } from 'react';
import textFieldStyles from './textfield.module.scss';

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  labelText?: string;
  children?: ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  labelText,
  disabled,
  ...props
}) => {
  return (
    <div className={textFieldStyles.container}>
      {!!labelText && <label htmlFor={id}>{labelText}</label>}
      <div
        className={
          textFieldStyles[
            disabled ? `input__container--disabled` : `input__container`
          ]
        }
      >
        <input
          className={textFieldStyles.input}
          id={id}
          {...props}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
