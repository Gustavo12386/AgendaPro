import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import React from 'react';

interface PropsProjectCard {
    id: string;
    name: string;
    budget: string;
    category: string;
    handleRemove: (id: string) => void; 
}

function ProjectCard({id, name, budget, category, handleRemove}: PropsProjectCard){
  
    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(window.confirm('Deseja deletar o projeto?')){
          e.preventDefault();
          handleRemove(id); 
        }        
    };  

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orcamento:</span> R${budget}  
      </p>  
      <p className={styles.category_text}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
           <BsPencil/> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill/> Excluir
        </button>    
      </div>
    </div>
  )
}

export default ProjectCard