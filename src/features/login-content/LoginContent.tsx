import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';

import { Button } from '@widgets/button';
import { Input } from '@widgets/input';
import { Message } from '@widgets/message';
import { Loader } from '@widgets/loader';
import classes from './styles.module.scss';

interface ErrorMessage {
  title: string;
  text: string;
  icon: string;
}

export const LoginContent: FC = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  // const [appState, setAppState] = useState();
  const [inputValue, setInputValue] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const [error, setError] = useState<ErrorMessage | null>(null);
  const navigate = useNavigate();

  // выбор ошибки для компонента Message
  useEffect(() => {
    if (errorInput === 'ID должен содержать от 4 до 8 цифр') {
      setError({
        icon: 'alert',
        title: 'Некорректный ID',
        text: 'Если у вас возникли проблемы, вы всегда можете обратиться на ресепшн за помощью.'
      });
    } else if (errorInput === 'Этот номер уже использовали') {
      setError({
        icon: 'warning',
        title: 'Повторный ввод ID',
        text: 'Поздравляем вас с днем рождения! Участие в акции доступно один раз в год. Ваш ID уже был использован 13.09.2024 и вам выпало: «Каре».'
      });
    } else if (errorInput === 'Ошибка соединения') {
      setError({
        icon: 'alert',
        title: 'Ошибка соединения',
        text: 'Проверьте вашу скорость интернета или попробуйте позже.'
      });
    } else {
      setError(null);
    }
  }, [errorInput]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    if (errorInput !== '') setErrorInput('');
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.length < 4 || inputValue.length > 8) {
      setErrorInput('ID должен содержать от 4 до 8 цифр'); 
    } else { 
      setIsLoaded(false);     
      const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

      axios.post(apiUrl, {
        method: 'POST',
        id: inputValue
      })
        .then(function (response) {
          console.log(response);
          
          setIsLoaded(true);
          navigate("/combination");
          // setAppState(response.data.result);
        })
        .catch(function (error) {
          console.log(error);
          setErrorInput('Ошибка соединения');
        });
        navigate("/combination"); //временно
    } 
  }

  return (
    <>
      {!isLoaded ? <Loader /> : (
        <div className={classes.login}>           
          <h1 className='typography-h1'>Участие в розыгрыше</h1>      

          <form onSubmit={event => handleSubmit(event)}>
            <Input value={ inputValue } onChange={ handleInputChange } onFocus={ handleInputFocus } error={ errorInput } />

            {errorInput === '' && 
              <Button
                text='Играть' 
                disabled={inputValue === '' ? true : false}  
                class='login-btn' 
              />
            }
          </form>      

          {error && <Message message={ error } />}
        </div> 
      )}  
    </> 
  );
}