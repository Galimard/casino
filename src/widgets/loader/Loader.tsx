import { FC } from 'react';
import classes from './styles.module.scss';
import { HeartsSvg } from '@assets/icons/HeartsSvg';
import { SpidesSvg } from '@assets/icons/SpidesSvg';
import { DiamondsSvg } from '@assets/icons/DiamondsSvg';
import { ClubsSvg } from '@assets/icons/ClubsSvg';

export const Loader:FC = () => { 
  return (
    <div className={classes.loader}>
      <SpidesSvg />
      <DiamondsSvg />
      <ClubsSvg />
      <HeartsSvg />
    </div>   
  );
}