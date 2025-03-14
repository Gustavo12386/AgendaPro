import {v4 as uuidv4} from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import Message from '../layout/Message';
import { FormEvent } from 'react';
import ServiceCard from '../service/ServiceCard'

interface Category {
  id: string;
  name: string;    
}

export interface Service {
  id: string;
  cost: string;
  name: string;
  description: string;  
}
  
export interface Project {
    id: string;
    name: string;
    budget: string;
    cost: string;
    category_id: string;
    category: Category; 
    services: Service[];
}

function ProjectEdit(){  
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [project, setProject] = useState<Project | null>(null)
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    category_id: '',
  });
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');

  //passando o nome da categoria
  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //passando os valores do formulario e o id da categoria
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
        setServices(data.services)
      })
      .catch((err) => console.log(err));
  }, [id]); 
  

  function editPost(formData: { name: string; budget: string; category_id: string }) {
    
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

  function createService(event: FormEvent<HTMLFormElement>, project: Project) {   
    // ultimo serviço
    const lastService = project.services[project.services.length - 1];

    //classificar o id do serviço
    lastService.id = uuidv4();

    //custo do ultimo serviço
    const lastServiceCost = lastService.cost;
   
    //valor do novo custo
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
        setMessage('Orcamento Ultrapassado, verifique o valor do serviço');
        setType('error');
        project.services.pop();
        return false;
    }
    
    // atualizar o valor do custo
    project.cost = newCost.toString();

    //funcao para realizar a atualizacao na API
    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
            setMessage('Servico Adicionado');
            setType('success');
        })
        .catch((err) => console.log(err));
}

function removeService(event: FormEvent<HTMLFormElement>, projectId: string, cost: string) {

  // se o id for nulo interrompe a função
  if (!project) return; 
  // filtrar o valor do id
  const servicesUpdated = project.services.filter(
      //o id não pode ser igual a do removido
      (service) => service.id !== projectId
  );
  
  //passando o projeto do estado atual
  const projectUpdated = project; 
  
  //selecionando o servico que deseja excluir do projeto
  projectUpdated.services = servicesUpdated;
  //subtraindo o custo atual pelo custo do servico
  projectUpdated.cost = (parseFloat(projectUpdated.cost) - parseFloat(cost)).toString();

  //funcao para realizar a atualizacao na API
  fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
  })
      .then((resp) => resp.json())
      .then((data) => {
          setProject(projectUpdated);
          setServices(servicesUpdated); 
          setMessage('Servico removido com sucesso!');
          setType('success');
      })
      .catch((err) => console.log(err));
}


  function toogleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  function toogleServiceForm(){
    setShowServiceForm(!showServiceForm)
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
          <div className={styles.service_form_container}>
            <h2>Adicione um serviço:</h2>  
            <button className={styles.btn} onClick={toogleServiceForm}>
               {!showServiceForm ? 'Adicionar serviço': 'Fechar'} 
            </button>
            <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm 
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
            </div>
          </div>  
          <h2>Serviços</h2>
          <Container customClass="start">
            {services.length > 0 &&
              services.map((service) => (
                <ServiceCard
                  id={service.id}
                    name={service.name}
                      cost={service.cost}
                        description={service.description}
                            key={service.id}
                            handleRemove={removeService} 
                        />
                    ))}
               {services.length === 0 && <p>Não há servicos cadastrados</p>}
           </Container>
        </Container>      
       </div>
     ) : (
        <Loading/>
     )}
    
   
    </>
  ) 

  
  
}

export default ProjectEdit