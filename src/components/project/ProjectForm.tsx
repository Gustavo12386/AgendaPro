import { useState, useEffect } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import React from 'react';

interface ProjectFormProps {
  handleSubmit: (formData: { name: string; budget: string; category_id: string }) => void;  
  btnText: string;
}

function ProjectForm({ btnText, handleSubmit}: ProjectFormProps){

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    budget: '',    
    category_id: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category_id: value,
    }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const budget = parseFloat(formData.budget);
    if (!isNaN(budget)) {
      handleSubmit(formData); // Passa formData para o createPost em NewProject
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
        value={formData.name ? formData.name : ''}
        handleOnChange={handleOnChange}
      />
      <Input
        type="number"
        text="Orçamento do Projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        value={formData.budget ? formData.budget : ''}
        handleOnChange={handleOnChange}
      />
      <Select
        name="category_id"
        text="Selecione a Categoria"
        options={categories}
        value={formData.category_id ? formData.category_id : ''}
        handleOnChange={handleCategory}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm;
