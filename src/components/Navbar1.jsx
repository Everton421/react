import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './../styles/Navbar1.css'
function Nav1() {
  return (
    <div id='nav'>
    
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          
          <Navbar.Brand href="#home"> <Link to='/' className='link'> Home</Link> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>   <Link to="/cadastroOrcamento" className='link'> novo orçamento</Link> </Nav.Link>
            <Nav.Link ><Link to="/orcamentos" className='link'> Orçamentos</Link> </Nav.Link>
         
          </Nav>
        </Container>
      </Navbar>

  </div>


  );
}

export default Nav1;