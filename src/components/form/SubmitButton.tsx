import styles from './SubmitButton.module.css'

interface InputProps{   
   text: string;   
}

function SubmitButton({text}: InputProps){
   return(
     <div className={styles.form_control}>
       <button className={styles.btn}>{text}</button> 
     </div>
   )
}

export default SubmitButton