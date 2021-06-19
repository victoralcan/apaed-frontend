import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Card, CardBody, CardHeader } from 'reactstrap';

interface IFornecedorProps extends StateProps, DispatchProps {}

class Fornecedor extends React.Component<IFornecedorProps> {
  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Fornecedor</CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail">Email de contato</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Digite aqui..." />
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
                <Label>Nome fantasia/Razão social</Label>
                <Input placeholder="Digite aqui..."></Input>
              </FormGroup>
            </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
