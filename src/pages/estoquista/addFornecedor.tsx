import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col } from 'reactstrap';

interface IAddFornecedorProps extends StateProps, DispatchProps {}

class AddFornecedor extends React.Component<IAddFornecedorProps> {
  render() {
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar fornecedor</CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail">Email de contato</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="exemplo@gmail.com" />
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Nome do responsável</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup tag="fieldset" row>
                <legend className="col-form-label col-sm-8">Esse fornecedor é?</legend>
                <Col sm={10}>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> Vendedor
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio1" /> Doador
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <br />
              <br />
              <FormGroup>
                <Label>CPF/CNPJ</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Nome fantasia ou razão social</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Endereço</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Telefone responsável</Label>
                <Input placeholder="xxxxx-xxxx"></Input>
              </FormGroup>
            </Form>
            <Link to="/user/fornecedor">
              <Button className="mb-4 float-right" color="success">
                Confirmar
              </Button>
            </Link>
            <Link to="/user/fornecedor">
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFornecedor);
