import { FC } from 'react';
import classes from './styles.module.scss';
import { AlertSvg } from '@assets/icons/AlertSvg';
import { WarningSvg } from '@assets/icons/WarningSvg';

interface MessageProps {
  message: {
    title: string;
    text: string;
    icon: string;
  }  
}

export const Message: FC<MessageProps> = ({ message }) => {  
  
    return (
      <div className={classes.message}>
        <div className={classes.header}>
          {message.icon === 'alert' ? <AlertSvg /> : <WarningSvg />}
          {message.title !== '' && <p className={classes.title}>{message.title}</p>}          
        </div>
        {message.text !== '' && <p className={classes.text}>{message.text}</p>}
      </div>
    );
}