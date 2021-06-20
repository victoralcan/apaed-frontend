import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';

interface IAddProdutoProps extends StateProps, DispatchProps {}

class AddProduto extends React.Component<IAddProdutoProps> {
  render() {
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar produto</CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md="6">
                  <FormGroup row>
                    <Label for="exampleSelect">Produto</Label>
                    <Input type="select" name="select" id="exampleSelect">
                      <option>Arroz</option>
                      <option>Feijão</option>
                    </Input>
                  </FormGroup>
                </Col>
                <br></br>
                <Col md="4">
                  <FormGroup>
                    <Link to="">
                      <Button collor="success">Novo tipo de produto</Button>
                    </Link>
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <FormGroup>
                <Label>Nome do produto</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exampleSelect">Setor de detino</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Cozinha</option>
                  <option>Panificação</option>
                  <option>Limpeza</option>
                  <option>Casa carinho</option>
                  <option>Bezerra de menezes</option>
                </Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exapleNumber">Quantidade de KG que deseja tranferir</Label>
                <Input type="number" name="numbe" id="exampleNumber"></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exampleText">Motivo da tranferência</Label>
                <Input type="textarea" name="text" id="exampletest"></Input>
              </FormGroup>
            </Form>
            <Link to="/user/estoque">
              <Button className="mb-4 float-right" color="success">
                Confirmar
              </Button>
            </Link>
            <Link to="/user/estoque">
              <Button className="mb-4 float-left" color="danger">
                Cancelar
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddProduto);
