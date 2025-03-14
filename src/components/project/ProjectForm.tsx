import { useState, useEffect } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import React from 'react';

interface Category {
  id: string; 
  name: string;
}

interface ProjectFormProps {
  handleSubmit: (formData: { name: string; budget: string; category_id: string }) => void;
  btnText: string;
  projectData?: { name: string; budget: string; category_id: string }; 
}

function ProjectForm({ btnText, handleSubmit, projectData}: ProjectFormProps){

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',   
    category_id: '',
  });
  
   // Carregar as categorias
   useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((resp) => resp.json())
    .then((data) => setCategories(data))
    .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    if (projectData) {      
      setFormData({
        name: projectData.name,
        budget: projectData.budget,
        category_id: projectData.category_id, 
      });
    }
  }, [projectData]);

  // trazer o valor de cada variavel para os campos input do formulário através do spread operator
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const budget = parseFloat(formData.budget);
    if (!isNaN(budget)) {
      handleSubmit(formData);
    } else {
      console.error("Orçamento inválido");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      setCategories(data)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do Projeto"
        value={formData.name}
        handleOnChange={handleOnChange}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        value={formData.budget}
        handleOnChange={handleOnChange}
      />
      <Select
        name="category_id"
        text="Selecione a Categoria"
        options={categories}
        value={formData.category_id}
        handleOnChange={(e) => {
          setFormData({ ...formData, category_id: e.target.value });
        }}
      />
      <SubmitButton text={btnText} />
    </form>
  );
  
}

export default ProjectForm;
