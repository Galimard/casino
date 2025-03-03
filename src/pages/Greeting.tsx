import { FC } from 'react';
import { GreetingContent } from '@features/greeting-content/GreetingContent';

export const Greeting: FC = () => {

  return (
    <div className='container'>
      <GreetingContent />
    </div>
  )
}