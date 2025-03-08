import styles from './Home.module.css';
import savings from '../../assets/computador-portatil.png'
import LinkButton from '../layout/LinkButton';

function Home(){
    return (
      <section className={styles.home_container}>
        <h1>Bem vindo ao<span>AgendaPro</span></h1>
        <p>Gerencie e Organize seus projetos aqui!</p>
        <LinkButton to="/newproject" text="Criar Projeto"/>
        <img src={savings} alt="AgendaPro"/>
      </section>  
    )
}

export default Home
