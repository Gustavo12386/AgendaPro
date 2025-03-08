import styles from './Container.module.css';
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode; 
    customClass?: string;
}    

function Container(props: ContainerProps) {
    return (
      <div className={`${styles.container} ${props.customClass ? styles[props.customClass] : ''}`}>
        {props.children}
      </div>
    );
  }

export default Container