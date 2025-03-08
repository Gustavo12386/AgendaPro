import styles from './Input.module.css'
import { ChangeEventHandler } from 'react'; 

interface InputProps{
   type: string;
   text: string;
   name: string;
   placeholder: string;   
   handleOnChange: ChangeEventHandler<HTMLInputElement>; 
   value: string; 
}

function Input({type, text, name, placeholder, handleOnChange, value}: InputProps){
   return(
     <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input
         type={type}
         name={name}
         id={name}
         placeholder={placeholder}
         onChange={handleOnChange}
         value={value}/>
     </div>
   )
}

export default Input