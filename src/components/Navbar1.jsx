import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './../styles/Navbar1.css'
function Nav1() {
  return (
    <div id='nav'>
    <Navbar className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand href="#home">orçamento</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>


  );
}

export default Nav1;