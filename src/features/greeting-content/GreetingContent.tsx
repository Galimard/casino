import { FC } from 'react';
import classes from './styles.module.scss';
import birthday from '../../assets/images/birthday.png';
import { Button } from '@widgets/button';

export const GreetingContent: FC = () => {
  return (
    <>           
      <h1 className='typography-h1'>Поздравляем <br />с Днем Рождения!</h1>      

      <div className={classes.imageWrap}>
        <img src={birthday} alt="с Днем Рождения" className={classes.image} /> 
      </div>
        
      <h2 className={`typography-h2 ${classes.subtitle}`}>Примите участие в&nbsp;розыгрыше</h2>

      <Button url='/login' text='Начать' disabled={false} class={classes.button} />
    </>  
  );
}