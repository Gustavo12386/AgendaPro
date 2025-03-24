import styles from './Footer.module.css'

function Footer(){
  return (
    <footer className={styles.footer}>      
      <p className={styles.copy_right}>
        <span className={styles.title}>AgendaPro</span><span className={styles.copy}>&copy; 2025</span> 
      </p>
    </footer>
  )
}

export default Footer