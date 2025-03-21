import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import  { useIOsKeyboardHeight }  from  'react-ios-keyboard-viewport' ;
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
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [keyboardPadding, setKeyboardPadding] = useState(24);
  const iosKeyboardHeight = useIOsKeyboardHeight();  
  
  //убираем скролл на айфоне
  useEffect(() => {
    if (!iosKeyboardHeight) return;

    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener(
      'touchmove', 
      preventScroll as EventListener, 
      { passive: false } as AddEventListenerOptions
    );

    return () => {
      document.removeEventListener(
        'touchmove', 
        preventScroll as EventListener, 
        { passive: false } as EventListenerOptions
      );
    };
  }, [iosKeyboardHeight]);

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
        text: errorMessage
      });
    } else if (errorInput === 'Ошибка') {
      setError({
        icon: 'alert',
        title: 'Ошибка',
        text: 'Обновите страницу.'
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
  }, [errorInput, errorMessage]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= 0) setInputValue(event.target.value);
    const value = event.target.value;

    if (/^\d*$/.test(value)) { 
      setInputValue(value);
      if (errorInput === 'Вводите только цифры') {
        setErrorInput('');
      }
    } else {
      setErrorInput('Вводите только цифры');
    }
  };

  const handleInputFocus = () => {
    if (errorInput !== '') setErrorInput('');
  }

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputRef.current?.blur();
  
    if (inputValue.length < 4 || inputValue.length > 8) {
      setErrorInput('ID должен содержать от 4 до 8 цифр'); 
    } else { 
      setIsLoaded(false);     
      const apiUrl = `https://bitrix-api.mantera.digital/rest/8/i12a3cvefxge9s8y/mdigital_combinationsraffle.combinations?action=addUserCombination&id=${inputValue}`;
      // const apiUrl = `/api/rest/8/i12a3cvefxge9s8y/mdigital_combinationsraffle.combinations?action=addUserCombination&id=${inputValue}`;

      axios.get(apiUrl)
        .then(function (response) {
          console.log(response);
          
          if (response.data?.result?.isNew) {
            navigate("/combination", {
              state: {
                combination: response.data.result.item.combination.code,
                date: response.data.result.item.dateCreate.split(' ')[0],
                userId: response.data.result.item.userGuestCardId
              }
            });
          } else {            
            setErrorInput('Этот номер уже использовали'); 
            setErrorMessage(`Поздравляем вас с днем рождения! Участие в акции доступно один раз в год. Ваш ID уже был использован ${response.data?.result?.item.dateCreate.split(' ')[0]} и вам выпало: «${response.data?.result?.item.combination.value}».`);
          }
          setIsLoaded(true);
        })
        .catch(function (error) {          
          // Проверка на отсутствие интернета
          if (!navigator.onLine) {
            setErrorInput('Ошибка соединения');
            return;
          }

          // Проверка на недоступность сервера
          if (
            !error.response || 
            error.code === 'ECONNABORTED' ||
            error.code === 'ERR_NETWORK' || 
            error.response.status === 500
          ) {            
            setErrorInput('Ошибка соединения');
          } else if (error.response.data.error === 'ERROR_CORE') {
            setErrorInput('Ошибка');
          } else if (error.response.data.error === 'PARAMETER_WRONG_TYPE') {         
            setErrorInput('ID не может быть равен 0');
          } else {
            setErrorInput('Ошибка соединения');
          }         
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } 
  }, [inputValue, navigate]);

  useEffect(() => {
    if (iosKeyboardHeight > 0) {
      setKeyboardPadding(24 + iosKeyboardHeight);
    }
  }, [iosKeyboardHeight]);

  return (
    <>
      {!isLoaded ? <Loader /> : (
        <div className={classes.login}>           
          <h1 className='typography-h1'>Участие в розыгрыше</h1>      

          <form className={classes.form} onSubmit={event => handleSubmit(event)}>
            <Input 
              ref={inputRef} 
              value={ inputValue } 
              onChange={ handleInputChange } 
              onFocus={ handleInputFocus } 
              error={ errorInput } 
            />
           
            <div className={classes.bottom} style={{ 
              bottom: `${keyboardPadding}px`, 
              transition: iosKeyboardHeight > 0 ? 'none' : 'bottom 0.3s ease' 
            }}>  
              <Button
                text='Играть' 
                disabled={inputValue === '' ? true : false}  
                class={`${error ? 'hidden' : ''}`}
              />             
              {error && 
                <Message message={ error } />}
            </div>
          </form>      

          
        </div> 
      )}  
    </> 
  );
}