import { FC } from 'react';
import { Link } from "react-router";
import classes from '../../styles.module.scss';
import LogoSvg from '@assets/icons/LogoSvg';

export const Header: FC = () => {
  return (
    <header className={classes.header}>           
      <div className="container">    
        <Link to="https://krasnayapolyana.game/">
          <LogoSvg />  
        </Link>       
      </div>    
    </header>  
  );
}