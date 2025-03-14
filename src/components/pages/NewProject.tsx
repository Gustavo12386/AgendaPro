import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

interface Category {
  id: string;
  name: string;
}

interface Project {
  budget: number; 
  cost: number;
  services: any[];
  name: string;
  category: Category;
}

function NewProject() {
  const navigate = useNavigate();  

  function createPost(formData: { name: string; budget: string; category_id: string }) {

    // Buscar categorias diretamente na função quando necessário
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((categories: Category[]) => {
        const categoryId = formData.category_id;
        const selectedCategory = categories.find((category) => category.id === categoryId);

        if (selectedCategory) {
          const project: Project = {
            budget: parseFloat(formData.budget),
            cost: 0,
            services: [],
            name: formData.name,
            category: {
              id: selectedCategory.id,
              name: selectedCategory.name,
            },
          };

          fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              navigate('/projects', { state: { message: 'Projeto Criado com Sucesso!' } });
            })
            .catch((err) => console.log(err));
        } else {
          console.error('Categoria não encontrada');
        }
      })
      .catch((err) => console.log('Erro ao buscar categorias:', err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
