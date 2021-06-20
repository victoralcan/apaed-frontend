import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';

interface IEditarProdutoProps extends StateProps, DispatchProps {}

class EditarProduto extends React.Component<IEditarProdutoProps> {
  render() {
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Editar produto</CardHeader>
          <CardBody>
            <Form>
              <Row form>
                <Col md="6">
                  <FormGroup row>
                    <Label for="exampleEmail">Codigo NCM</Label>
                    <Input placeholder="Digite aqui..."></Input>
                  </FormGroup>
                </Col>
                <br></br>
                <Col md="4">
                  <FormGroup>
                    <Label>Quantidade em estoque</Label>
                    <Input placeholder="Autopreencher"></Input>
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
                <Label for="exampleDate">Data de validade</Label>
                <Input type="date" name="date" id="exampleDate"></Input>
              </FormGroup>
            </Form>
            <Link to="/user/estoque">
              <Button className="mb-4 float-right" color="success">
                Alterar
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

export default connect(mapStateToProps, mapDispatchToProps)(EditarProduto);
