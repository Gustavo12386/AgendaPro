import styles from './LinkButton.module.css'
import {Link} from 'react-router-dom'

interface LinkButtonProps {
    to: string;   
    text: string; 
}

function LinkButton({to, text}: LinkButtonProps){
    return(
      <Link className={styles.btn} to={to}>
        {text}
      </Link>  
    )
}

export default LinkButton