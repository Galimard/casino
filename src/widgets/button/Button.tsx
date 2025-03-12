import { FC, memo } from 'react';
import { Link } from "react-router";
import classes from './styles.module.scss';

interface ButtonProps {
  url?: string;
  disabled?: boolean;
  text: string;
  class?: string;
}

export const Button: FC<ButtonProps> = memo(({ ...props }) => {     
  console.log(123);
       
    return (
      <>
        {props.url && props.url !== '' ? 
          (
            <Link 
              to={ props.url } 
              className={
                `${classes.button} ${props.disabled ? classes.disabled : ''} ${props.class ? classes[props.class] : ''}`
              } 
            >
                { props.text }
            </Link>
          ) : (
            <button 
              className={
                `${classes.button} ${props.disabled ? classes.disabled : ''} ${props.class ? classes[props.class] : ''}`
              } 
              type='submit'
            >
              { props.text }
            </button>
          )
        }        
      </>      
    );
});