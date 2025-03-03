import { FC, useEffect, useState } from 'react';
import Cards from './ui/cards/Cards';

export const CombinationContent: FC = () => {
  const [combination, setCombination] = useState<string>(''); 
  const [isFanOut, setIsFanOut] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const randomValue = Math.random() * 100; 

    if (randomValue <= 86.8) {
      setCombination('Пара');
    } else if (randomValue <= 95.5) {
      setCombination('Фулл-хаус');
    } else if (randomValue <= 99.8) {
      setCombination('Каре');
    } else {
      setCombination('Флеш-рояль');
    }  
  }, []);

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