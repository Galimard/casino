import { FC } from 'react';
import classes from '../../styles.module.scss';
import back from '@assets/images/card_back.png';
import ten_c from '@assets/images/10_c.png';
import ten_d from '@assets/images/10_d.png';
import ten_s from '@assets/images/10_s.png';
import ace_c from '@assets/images/ace_c.png';
import ace_d from '@assets/images/ace_d.png';
import ace_h from '@assets/images/ace_h.png';
import ace_s from '@assets/images/ace_s.png';
import j_s from '@assets/images/j_s.png';
import q_s from '@assets/images/q_s.png';
import k_s from '@assets/images/k_s.png';

const combinations = [
  {
    name: 'Пара',
    nameBack: 'Пара',
    cards: [j_s, q_s, ace_h, ten_c, ace_d]
  },
  {
    name: 'Фулл-хаус',
    nameBack: 'Фулл хаус',
    cards: [ten_d, ten_s, ace_h, ten_c, ace_d]
  },
  {
    name: 'Каре',
    nameBack: 'Каре',
    cards: [ace_c, ace_s, ace_h, ten_c, ace_d]
  },
  {
    name: 'Флеш-рояль',
    nameBack: 'Флеш-рояль',
    cards: [ten_s, j_s, q_s, k_s, ace_s]
  }
]

interface CardsProps {
  combination: string;
  isFanOut: boolean;
  isFlipped: boolean;
} 

const Cards: FC<CardsProps> = ({ combination, isFanOut, isFlipped }) => {
  const comboObject = combinations.find(item => item.nameBack === combination);

  if (!comboObject) return null;

  return (
    <>
      <h2 className={`${classes.title} ${isFlipped ? classes.show : ''}`}>{ comboObject.name }</h2>

      <div className={classes.wrap}>
        {comboObject && comboObject.cards.map((card, idx) => (
          <div
            key={idx}
            className={classes.cardWrap}
            style={{
              transform: `
                translate(-50%, -50%)
                ${isFanOut 
                  ? `rotate(${(idx - 2) * 15}deg) translate(${(idx - 2) * 15}px, -50px)` 
                  : `translate(${idx * -5}px, ${idx * -5}px)`
                }
              `,
            }}
          >
            <div
              className={classes.card}
              style={{
                transform: `${isFlipped ? 'rotateX(180deg)' : ''}`,
                transition: `transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(comboObject.cards.length - 1 - idx) * 100}ms`,
              }}
            >
              <div className={classes.back}>
                <img src={back} alt="рубашка" />
              </div>
              
              <div className={classes.front}>
                <img src={card} alt="карта" />
              </div>
            </div>
          </div>
        ))}
      </div>   

      <p className={`typography-body1 ${classes.subtitle} ${isFlipped ? classes.show : ''}`}>Покажите этот экран сотруднику казино для получения подарка</p>
    </>    
  );
};

export default Cards;

