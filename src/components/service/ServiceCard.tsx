import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../project/ProjectCard.module.css'

interface PropsServiceCard {
    id: string;
    name: string;
    cost: string;
    description: string;
    handleRemove: (event: React.FormEvent<HTMLFormElement>, projectId: string, cost: string) => void; 
  }

function ServiceCard({id, name, cost, description, handleRemove}: PropsServiceCard){

    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if(window.confirm('Deseja deletar esse servico?')){
        e.preventDefault(); 
        handleRemove(e as any, id, cost);  
      }  
    };

   return(
     <div className={styles.project_card}>
       <h4>{name}</h4>
       <p>
         <span>Custo Total:</span> R${cost}
       </p>
       <p>{description}</p>
       <div className={styles.project_card_actions}>
          <button onClick={remove}>
            <BsFillTrashFill/>
            Excluir
          </button>
       </div>
     </div>
   )
}

export default ServiceCard