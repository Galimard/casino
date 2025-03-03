import { FC } from 'react';
import classes from './styles.module.scss';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export const Input: FC<InputProps> = ({ value, onChange, onFocus, error }) => {    
    return (
      <div className={classes.wrap}>  
        <span className={classes.label}>Введите ID с вашей карты Гостя</span>         
        <input
          value={ value }
          className={`${classes.input} ${error !== '' ? classes.error : ''}`}
          onChange={onChange}
          onFocus={onFocus}
          type='number'
          minLength={4} 
          maxLength={8}
        /> 
        {error !== '' && (
          <span className={classes.errorText}>
            {error}
          </span>
        )}      
      </div>
    );
}