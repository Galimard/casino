import { ReactNode } from 'react';
import { Header } from './ui/header/Header';
import classes from './styles.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return(
    <div className={classes.layout}>      
      <Header />      
      <main className={classes.main}>{ children }</main>
    </div>
  );
}