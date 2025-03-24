import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import Loading from '../layout/Loading'
import { useState, useEffect } from "react"

interface Project {
    _id: string;
    name: string;
    budget: string;
    category: { name: string };
}

function Projects(){
    const [projects, setProjects] = useState<Project[]>([]);
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
     setTimeout(() => {
      fetch('https://api-agendapro.vercel.app/api/projects',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',  
        },  
        }).then(resp => resp.json())
          .then((data) => {
          console.log(data)
          setProjects(data)
          setRemoveLoading(true)
        })
        .catch ((err) => console.log(err))  
     }, 3000)   
    }, [])

    function removeProject(id: string) {
        fetch(`https://api-agendapro.vercel.app/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => resp.json())
          .then(() => {
            setProjects(projects.filter((project) => project._id !== id));
            setProjectMessage('Projeto Removido com Sucesso!')
          })
          .catch((err) => console.log(err));
    }

    return (
       <div className={styles.project_container}>
          <div className={styles.title_container}>
           <h1>Meus Projetos</h1>
           <LinkButton to="/newproject" text="Criar Projeto"/>
          </div>
          {message && <Message type="success" msg={message}/>}
          {projectMessage && <Message type="success" msg={projectMessage}/>}
          <Container customClass="start">
            {projects.length > 0 &&
             projects.map((project) => (
                <ProjectCard
                 _id={project._id}
                 name={project.name}   
                 budget={project.budget}
                 category={project.category.name}
                 key={project._id}       
                 handleRemove={removeProject}       
                 />
            ))}
            {!removeLoading && <Loading/>}
            {removeLoading && projects.length === 0 &&(
              <p>Não há projetos cadastrados</p>  
            )}
          </Container>
       </div> 
    )
}

export default Projects