
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import axios from 'axios'
const Orcamentos = ()=>{

        const [orcamentos, setOrcamentos] = useState([])

    useEffect(
        ()=>{
          async function a(){  axios.get('http://192.168.237.130:3000/orcamentos')   
            .then((response)=>{ setOrcamentos(response.data)})
            .then(console.log(orcamentos))
            
            .then((orcamentos)=>{ console.log(""+orcamentos)})
            .catch((err)=>{console.log(err)})
                }   
                a();
            },[]
    
        )
    
    return(
            <div>
      
      {orcamentos.map( (orcamento)=>(
    
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          
            <Button variant="primary">
      orçamento <Badge bg="secondary">{orcamento.CODIGO}</Badge>
      
    </Button>
             {orcamento.NOME} </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
    ))} 
            </div>
        );
}
export default Orcamentos;