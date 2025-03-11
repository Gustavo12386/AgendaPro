import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

interface Category {
    id: string;
    name: string;    
}
  
interface Project {
    id: string;
    name: string;
    budget: string;
    cost: string;
    category_id: string;
    category: Category; 
}

function ProjectEdit(){  
  const {id} = useParams()
  const [categories, setCategories] = useState<Category[]>([]);
  const [project, setProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    category_id: '',
  });
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta do servidor:', data); 
        setProject(data);     
        setFormData({
          name: data.name,
          budget: data.budget,
          category_id: data.category.id          
        });
      })
      .catch((err) => console.log(err));
  }, [id]); 
  

  function editPost(formData: { name: string; budget: string; category_id: string }) {
    console.log('FormData:', formData);
    if (project) { 
        const updatedProject: Project = {
            ...project,
            name: formData.name,
            budget: formData.budget,
            category: {
              id: formData.category_id,
              name: categories.find((category) => category.id === formData.category_id)?.name!,
            },
          };
  
      // Now you can proceed with the fetch and other logic as before
      if (parseFloat(updatedProject.budget) < parseFloat(updatedProject.cost)) {
        setMessage('O orçamento não pode ser menor que o custo do projeto!');
        setType('error');
        return false;
      }
  
      fetch(`http://localhost:5000/projects/${updatedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log('Resposta do servidor:', data);
          setProject(data);
          setShowProjectForm(false);
          setMessage('Projeto Atualizado');
          setType('success');
        })
        .catch((err) => console.log(err));
    }
  }

  function toogleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  return(
    <>
     {project?.name ? (
        <div className={styles.project_details}>
        <Container customClass="column">
          {message && <Message type={type!} msg={message}/>}  
          <div className={styles.details_container}>
            <h1>Projeto: {project.name}</h1>  
            <button className={styles.btn} onClick={toogleProjectForm}>
               {!showProjectForm ? 'Editar projeto': 'Fechar'} 
            </button>
            {!showProjectForm ? (
              <div className={styles.project_info}>
                <p>
                  <span>Categoria:</span>{project.category.name}   
                </p>
                <p>
                  <span>Total de Orçamento:</span> R$ {project.budget}   
                </p>         
                <p>
                  <span>Total Utilizado</span> R$ {project.cost}     
                </p>       
              </div>  
            ) : (
              <div className={styles.project_info}>
                <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={formData} />
              </div>   
            )}
          </div>    
        </Container>      
       </div>
     ) : (
        <Loading/>
     )}
    
   
    </>
  ) 

  
  
}

export default ProjectEdit