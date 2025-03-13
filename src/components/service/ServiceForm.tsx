import {Project} from '../pages/ProjectEdit'
import {Service} from '../pages/ProjectEdit'
import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from '../project/ProjectForm.module.css'

interface ServiceFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, project: Project) => void; 
    btnText: string; 
    projectData: Project; 
}

function ServiceForm({ handleSubmit, btnText, projectData }: ServiceFormProps){

   const [service, setService] = useState<Service>({
    id: '',         
    cost: '',  
    name: '',
    description: ''   
   }) 

  
   function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    projectData.services.push(service); 
    handleSubmit(e, projectData);
  }

    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setService({ ...service, [e.target.name]: e.target.value });
    }


   return(
     <form onSubmit={submit} className={styles.form}>
        <Input
          type='text'
          text='Nome do Servico'
          name='name'
          value={service.name}
          placeholder='Insira o nome do servico'
          handleOnChange={handleChange}
        />
        <Input
          type='number'
          text='Custo do serviço'
          name='cost'
          value={service.cost}
          placeholder='Insira o valor total'
          handleOnChange={handleChange}
        />
        <Input
          type='text'
          text='Descrição do Servico'
          name='description'
          value={service.description}
          placeholder='Descreva o servico'
          handleOnChange={handleChange}
        />
        <SubmitButton text={btnText}/>
     </form>
   )
}

export default ServiceForm