import { useEffect, useState } from 'react'

import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import './App.css';

import axios from 'axios'
import Table from 'react-bootstrap/Table';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav1 from './components/Navbar1'




function App() {
  const [produtos, setProdutos] = useState()

  const [client, setClient] = useState([])
  const [prod, setProd] = useState([])
  let [qtdprod, setQtdprod] = useState(0)

  const [proorca, setProorca] = useState([]);
  const [cliorca, setCliorca] = useState({});
  const [orcamento, setOrcamento] = useState({})
  const [dadosorcamento, setDadosorcamento] = useState();

  const [totalProduto, setTotalProduto] = useState(0);
  const [buscador, setBuscador] = useState("");
  const [buscador1, setBuscador1] = useState("");
  const [clienteInvalido, setClienteInvalido] = useState(false);
 
  const [produtoInvalido , setProdutoInvalido] = useState(false);


  const adicionarproduto = (produto, descricao, valor, desconto) => {
    const novoProduto = { "prod": produto, "descricao": descricao, "qtd": 1, "preco": valor, "desconto": 0 };
    novoProduto.totalProduto = novoProduto.qtd * novoProduto.preco;
    setProorca([...proorca, novoProduto]);
    setTotalProduto(totalProduto + novoProduto.totalProduto);
    
  };


  const adicionaClient = (cliente) => {

    setCliorca(cliente)
  }

  const removeProduto = (produto) => {
    const novosProdutos = proorca.filter((item) => item.prod !== produto);
    setProorca(novosProdutos);
  };

  const atualizarTotalProdutos = (index, quantidade) => {
    const novosProdutos = [...proorca];
    const produto = novosProdutos[index];
    produto.qtd = quantidade;
    produto.totalProduto = produto.qtd * produto.preco;
   
    setProorca(novosProdutos);
    console.log(novosProdutos)



  };

  const addDesconto = (index, desconto) => {
    const novosProdutos = [...proorca];
    const produto = novosProdutos[index];

    if (desconto > produto.preco) {
      alert("Valor de desconto maior do que o valor do produto!");
    } else {
      produto.desconto = desconto;
      produto.totalProduto = produto.qtd * produto.preco - produto.desconto;
      setProorca(novosProdutos);
      calcularTotal();

      let totalDosDescontos = 0 ;
      let totalComDesconto = 0;
      let totalProdutos  = 0;
      let totalGeral = 0;
     
    /*  proorca.forEach((produto) => {
       
        totalProdutos += produto.preco * produto.qtd
          totalComDesconto += (produto.preco * produto.qtd) - produto.desconto
          totalGeral += produto.totalProduto;
      
        });
        setDadosorcamento({"total":totalGeral})
*/
    }
  };



  const calcularTotal = () => {
    let totalGeral = 0;
    proorca.forEach((produto) => {
      totalGeral += produto.totalProduto;
    });
  
    return {
      totalGeral,
      
  
    };
    
  };



  const calcularTotalDesconto = () => {
    let totalProduto = 0;
    var totalDosDescontos = 0;
    let totalComDesconto = 0;

    proorca.forEach((produto) => {
      totalProduto += produto.preco * produto.qtd
      totalComDesconto += (produto.preco * produto.qtd) - produto.desconto
    });
    totalDosDescontos = (totalProduto - totalComDesconto)

    return {
      totalDosDescontos,
    };
  };

 
  function enviarorcamento(cliorca, proorca) {
    const novoOrcamento = {
      "cliente": cliorca, "produtos": proorca,
      "dadosorcamento": dadosorcamento
    };

    if (novoOrcamento.cliente.codigo == '' || novoOrcamento.cliente.codigo == undefined) {
      setClienteInvalido(true);
      return;
    } else {
      if (novoOrcamento.produtos == '' || novoOrcamento.produtos == undefined) {
       setProdutoInvalido(true)
        return;
      }
    }
    setOrcamento(novoOrcamento);
  }



  useEffect(() => {
    console.log(orcamento);
    if (orcamento == undefined) {
      console.log("{}")
    } else {

      axios.post('http://192.168.237.130:3000/teste', orcamento)
        .then((response) => { alert("orcamento gravado") })
        .catch((err) => { console.log(err) });
    }
  }, [orcamento]);



  useEffect(() => {
    async function buscarProdutos() {
      await axios.get('http://192.168.237.130:3000/produtos/')
        .then((response) => {
          setProd(response.data);
          // console.log(prod);

        })
        .catch((err) => {
          console.log(err);
        });
    }
    buscarProdutos();

    async function buscacliente() {
      await axios.get('http://192.168.237.130:3000/clientes')
        .then((response) => {
          setClient(response.data)
        })
    }
    buscacliente()

  }, []);

  useEffect(() => {
    const calcularTotalGeral = () => {
      let totalGeral = 0;
 
      proorca.forEach((produto) => {
        totalGeral += produto.totalProduto;
      });
      return totalGeral;
   
    };


    const calcularTotalDosProdutos = () => {
      let TotalDosProdutos = 0;
 
      proorca.forEach((produto) => {
        TotalDosProdutos += produto.qtd * produto.preco;
      });
      return TotalDosProdutos;
   
    };



  
  
 
    const totalGeral = calcularTotalGeral();
    const valorTotalProdutos = calcularTotalDosProdutos();


    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
   var dataAtual = ano + '-' + mes + '-' + dia;
    console.log(dataAtual);

          setDadosorcamento({ ...dadosorcamento,
          COD_SITE:10,
            TOTAL: totalGeral,
            TOTAL_PRODUTOS:valorTotalProdutos,
            DESC_PROD:calcularTotalDesconto().totalDosDescontos,
            DATA_CADASTRO:dataAtual,
            VAL_PROD_MANIP:valorTotalProdutos,
              SITUACAO:"EA",
              VENDEDOR: 1,
              DATA_PEDIDO : dataAtual,
              DESTACAR: "N",
              TABELA:"p",
              DATA_REFER:"C",
              QTD_PARCELAS:1,
              EXT_INT_OS:"L"

              });
  }, [proorca]);
  


  /*
      <ListGroup.Item id='boxprod'key={produto.codigo} action onClick={() => { adicionarproduto(produto.codigo, produto.descricao, produto.PRECO ) }}>
                      <a className='a'>  codigo: {produto.codigo}</a>
                      <a className='a'> {produto.descricao}</a>
                      <a className='a'><Badge bg="primary" pill>
                        R$: {produto.PRECO}
                      </Badge></a>
                    </ListGroup.Item>
                
*/

  return (
    <div className='dv'>
      <Nav1 />
      <div className='container'>
        <div className='container2'>
        {clienteInvalido && (
        <Alert variant="danger" onClose={() => setClienteInvalido(false)} dismissible id='alert'>
          Cliente inválido!
        </Alert>
      )}

{produtoInvalido && (
        <Alert variant="danger" onClose={() => setClienteInvalido(false)} dismissible>
          É necessário informar os produtos para gravar!
        </Alert>
      )}
      
      
      

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Badge bg="primary" pill>
                  cliente
                </Badge>
                <InputGroup.Text id="tdDescrição">
                  {cliorca.nome}
                </InputGroup.Text>
              </Accordion.Header>
              <Accordion.Body>
                <Form noValidate>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                      <Form.Label >
                        <Badge>cliente</Badge>
                      </Form.Label>
                      <InputGroup.Text id="tdDescrição">
                        {cliorca.nome}
                      </InputGroup.Text>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label> <Badge>cpf</Badge></Form.Label>
                      <InputGroup.Text id="tdDescrição">{cliorca.cpf}</InputGroup.Text>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label><Badge>IE/RG</Badge></Form.Label>
                      <InputGroup.Text id="inputGroupPrepend">{cliorca.rg}</InputGroup.Text>
                    </Form.Group>
                  </Row>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>



       



          <Table striped bordered hover>
            <thead>
              <tr>
             
                <th id="tdDescrição" >descrição</th>
                <th id="tdDescrição" >quantidade</th>
                <th id="tdDescrição" >desconto</th>
                <th id="tdDescrição" >unitario</th>
                <th id="tdDescrição">total</th>
                <th></th>
              </tr>
            </thead>
            {proorca.map((produto, index) => (<tbody>
              <tr>
                
                <td id='tdDescrição1'>{produto.descricao}</td>
                <td>
                  <InputGroup className="mb-2">
                    <Form.Control placeholder="quantidade" id='input'
                      onChange={(e) => atualizarTotalProdutos(index, e.target.value)}
                      value={produto.qtd} type='number' />

                    
                  </InputGroup>
                  <Badge  id="tdDescrição1">{produto.qtd}</Badge>
                  
                </td>
                <td>

                  <InputGroup className="mb-2">
                    <Form.Control   id='input'
                      onChange={(e) => addDesconto(index, e.target.value)}
                      type='number'

                    />

                 
                  </InputGroup>
                  <Badge bg="primary" pill  id="tdDescrição1">  R$: {produto.desconto} </Badge>

                </td>
                <td>
                 <Badge bg="primary" pill id="tdDescrição1"> 
                    R$: {produto.preco}
                  </Badge>
                </td>
                <td>
                   <Badge bg="primary" pill id="tdDescrição1">
                    R$: {produto.totalProduto}
                  </Badge>
                </td>
                <td>

                  <Button variant="danger" id='delete' onClick={() => removeProduto(produto.prod)}>x

                  </Button>
                </td>
              </tr>
            </tbody>
            ))}
            <thead>
              <tr>
                <th id="tdDescrição">total
                  <a className='a'> <Badge bg="primary" pill>
                    R$: {calcularTotal().totalGeral} </Badge> </a>
                </th>

                <th id="tdDescrição">total descontos
                  <a className='a'> <Badge bg="primary" pill>
                    R$: {calcularTotalDesconto().totalDosDescontos} </Badge> </a>
                </th>



          </tr>
            </thead>

          </Table>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => { enviarorcamento(cliorca, proorca) }}>
              gravar
            </Button>

          </div>






          <Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header> <a className='title'> produtos </a></Accordion.Header>
    <Accordion.Body>
      <Form.Control id="inlineFormInputGroup" placeholder="produto" type="text" onChange={(e) => setBuscador(e.target.value)} />

      <ListGroup defaultActiveKey="#link1">
        {

        buscador !== "" &&
        prod
          .filter(
            (produto) =>
              produto.descricao.includes(buscador.toUpperCase()) ||
              produto.codigo.toString().includes(buscador)
          )
          .map((produto) => (
            <ListGroup.Item
              id="boxprod"
              key={produto.codigo}
              action
              onClick={() => {
                adicionarproduto(produto.codigo, produto.descricao, produto.PRECO);
              }}
            >
              <Badge bg="primary" pill id="tdDescrição"> {produto.codigo} </Badge>
              <a className="a"  id="idDescriçãoclient">  {produto.descricao}
             </a>
                <Badge bg="primary" pill >
                  R$: {produto.PRECO}
                </Badge>
             
            </ListGroup.Item>
          ))}
      </ListGroup>

    </Accordion.Body>
  </Accordion.Item>
</Accordion>


<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header> <a className='title'>clientes</a></Accordion.Header>
             
    <Accordion.Body>
      <Form.Control id="inlineFormInputGroup" placeholder="cliente" type="text" onChange={(e) => setBuscador1(e.target.value)} />

      {
        buscador1 !== "" && // Verifica se o buscador1 não está vazio
        client
          .filter((cliente) =>
            cliente.codigo.toString().includes(buscador1) ||
            cliente.nome.toString().includes(buscador1)
          )
          .map((client) => (
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item id='boxclient' action onClick={() => { adicionaClient(client) }}>
                <Badge bg="primary" pill id="tdDescrição">
                  {client.codigo}
                </Badge>
                <a id="idDescriçãoclient" className='a'>{client.nome}</a>
                <Badge>
                  cpf:{client.cpf}
                </Badge>              
              </ListGroup.Item>
            </ListGroup>
          ))
      }
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


        </div>
      </div>
    </div>



  );
}

export default App;
