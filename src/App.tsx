import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home.tsx'
import Contact from './components/pages/Contact.tsx'
import Company from './components/pages/Company.tsx'
import NewProject from './components/pages/NewProject.tsx'
import Container from './components/layout/Container.tsx'
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import Projects from './components/pages/Projects.tsx'

function App() {

  return (
    <Router>
      <Navbar/>          
      <Container customClass="min-height">
        <Routes>        
        <Route path="/" element={<Home />} /> 
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>  
      <Footer/>
    </Router>
  )
}

export default App
