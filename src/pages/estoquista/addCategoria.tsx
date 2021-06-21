import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';

interface ICategoriaProps extends StateProps, DispatchProps {}

class Categoria extends React.Component<ICategoriaProps> {
  render() {
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar categoria</CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md="6">
                  <FormGroup row>
                    <Label for="exampleSelect">Categoria</Label>
                    <Input type="select" name="select" id="exampleSelect">
                      <option>1</option>
                      <option>2</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <br></br>
              <FormGroup>
                <Label>Nome</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Código NCM</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label for="exampleText">Descrição</Label>
                <Input type="textarea" name="text" id="exampleText"></Input>
              </FormGroup>
            </Form>
            <br />
            <FormGroup>
              <Label for="exampleSelect">Unidade de medida</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Kg</option>
                <option>Litros</option>
              </Input>
            </FormGroup>
            <br />
            <FormGroup>
              <Label for="exapleNumber">Quantidade mínima</Label>
              <Input type="number" name="numbe" id="exampleNumber"></Input>
            </FormGroup>
            <br />
            <Link to="/user/addTipoProduto">
              <Button className="mb-4 float-right float-down" color="success">
                Adicionar Categoria
              </Button>
            </Link>
            <Link to="/user/addTipoProduto">
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

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
