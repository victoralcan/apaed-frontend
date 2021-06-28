import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button } from 'reactstrap';

interface IAddSetorProps extends StateProps, DispatchProps {}

class AddSetor extends React.Component<IAddSetorProps> {
  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar Setor</CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Label>Nome do Setor</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup row>
                <Label for="exampleEmail">Email de contato (opcional)</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="exemplo@gmail.com" />
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Nome do responsável</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>CPF/CNPJ</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Endereço</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
              <br></br>
              <FormGroup>
                <Label>Telefone responsável (opcional)</Label>
                <Input placeholder="xxxxx-xxxx"></Input>
              </FormGroup>
            </Form>
            <Link to="/user/fornecedor">
              <Button className="mb-4 float-right" color="success">
                Confirmar
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSetor);
