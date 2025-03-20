import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cards from './ui/cards/Cards';
import classes from './styles.module.scss';

export const CombinationContent: FC = () => {
  const location = useLocation();
  const { combination, userId } = location.state || {};
  const [isFanOut, setIsFanOut] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fanOutTimer = setTimeout(() => setIsFanOut(true), 700);
    const flipTimer = setTimeout(() => setIsFlipped(true), 1700);
    
    return () => {
      clearTimeout(fanOutTimer);
      clearTimeout(flipTimer);
    };
  }, []);

  return (
    <>     
      <div className={`${classes.id} ${isFlipped ? classes.show : ''}`}>ID: { userId }</div>      
      <h1 className='typography-h1'>Ваша комбинация!</h1> 
      <Cards
        combination={ combination } 
        isFanOut={ isFanOut } 
        isFlipped={ isFlipped } 
      />
    </>  
  );
}