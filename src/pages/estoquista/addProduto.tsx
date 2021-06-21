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
                <Col md="6">
                  <FormGroup>
                    <Link to="">
                      <Button color="primary">Novo tipo de produto</Button>
                    </Link>
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <FormGroup>
                <Label for="exampleDate">Data de validade</Label>
                <Input type="date" name="date" id="exampleDate"></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exampleSelect">Selecione o fornecedor (opcional)</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Fornecedor 1</option>
                  <option>Fornecedor 2</option>
                  <option>Doador 2</option>
                </Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exapleNumber">Quantidade de produto</Label>
                <Input type="number" name="numbe" id="exampleNumber"></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exampleSelect">Unidade de medida</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>Kg</option>
                  <option>Litros</option>
                </Input>
              </FormGroup>
              <FormGroup tag="fieldset" row>
                <legend className="col-form-label col-sm-5">Esse produto é uma?</legend>
                <Col sm={10}>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio2" /> Compra
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio2" /> Doação
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Form>
            <br />
            <Link to="/user/estoque">
              <Button className="mb-4 float-right float-down" color="success">
                Adicionar produto
              </Button>
            </Link>
            <Link to="/user/addProduto">
              <Button className="mb-8 float-right" color="warning">
                Adicionar mais produtos
              </Button>
            </Link>
            <Link to="/user/estoque">
              <Button className="mb-8 float-left" color="danger">
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
