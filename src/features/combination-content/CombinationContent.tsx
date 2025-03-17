import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cards from './ui/cards/Cards';

export const CombinationContent: FC = () => {
  const location = useLocation();
  const { combination } = location.state || {};
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
      <h1 className='typography-h1'>Ваша комбинация!</h1> 
      <Cards
        combination={ combination } 
        isFanOut={ isFanOut } 
        isFlipped={ isFlipped } 
      />
    </>  
  );
}