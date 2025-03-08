import styles from './Select.module.css';
import { ChangeEventHandler } from 'react';

interface InputProps {
   text: string;
   name: string;
   options: { id: number; name: string }[];
   handleOnChange: ChangeEventHandler<HTMLSelectElement>; 
   value: string;
}

function Select({ text, name, options, handleOnChange, value }: InputProps) {
   return (
     <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
          <option value="">Selecione Uma Opção</option>
          {options.map((option) => (
           <option value={option.id} key={option.id}>{option.name}</option>
          ))}
        </select>
     </div>
   )
}

export default Select;

