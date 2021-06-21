import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';

interface IAddTipoProdutoProps extends StateProps, DispatchProps {}

class AddTipoProduto extends React.Component<IAddTipoProdutoProps> {
  render() {
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar tipo produto</CardHeader>
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
                <br></br>
                <Col md="6">
                  <FormGroup>
                    <Link to="">
                      <Button color="primary">Adicionar categoria</Button>
                    </Link>
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
                <Label>Marca</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
            </Form>
            <br />
            <Link to="/user/estoque">
              <Button className="mb-4 float-right float-down" color="success">
                Adicionar tipo de produto
              </Button>
            </Link>
            <Link to="/user/addProduto">
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTipoProduto);
