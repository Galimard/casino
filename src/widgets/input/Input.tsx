import { forwardRef } from 'react';
import classes from './styles.module.scss';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  error: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onFocus, error }, ref) => {    
    return (
      <div className={classes.wrap}>  
        <span className={classes.label}>Введите ID с вашей карты Гостя</span>         
        <input
          ref={ref} 
          value={value}
          className={`${classes.input} ${error ? classes.error : ''}`}
          onChange={onChange}
          onFocus={onFocus}
          type='number'
          minLength={4}
          maxLength={8}
        /> 
        {error && (
          <span className={classes.errorText}>
            {error}
          </span>
        )}      
      </div>
    );
  }
);

Input.displayName = 'Input';