import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { IRootState } from '../../shared/reducers';
import { createDonor, reset as resetDonor } from '../../shared/reducers/donor.reducer';
import { IDonor } from '../../shared/model/donor.model';
import { IContact } from '../../shared/model/contact.model';
import { createContactForFornecedor, reset as resetContact } from '../../shared/reducers/contact.reducer';

interface IAddFornecedorProps extends StateProps, DispatchProps, RouteComponentProps {}

class AddFornecedor extends React.Component<IAddFornecedorProps> {
  handleValidSubmit = (
    event,
    { name, email, document, public_place, complement, number, district, city, state, country, zip_code, phone },
  ) => {
    event.persist();
    const newDonor: IDonor = {
      name,
      email,
      document,
    };
    const newContact: IContact = {
      public_place,
      complement,
      number,
      district,
      city,
      state,
      country,
      zip_code,
      phone,
    };
    this.props.createContactForFornecedor(newContact, newDonor);
  };

  render() {
    const {
      createContactSuccess,
      createContactError,
      createDonorSuccess,
      createDonorError,
      loadingContact,
      loadingDonor,
    } = this.props;

    if (
      createContactSuccess &&
      !createContactError &&
      !createDonorError &&
      createDonorSuccess &&
      !loadingContact &&
      !loadingDonor
    ) {
      console.log('Deu Bom');
      this.props.resetContact();
      this.props.resetDonor();
      this.props.history.push('/user/fornecedor');
    }

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar fornecedor/doador</CardHeader>
          <CardBody>
            <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Nome</Label>
                    <AvField className="form-control" name="name" id="name" required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="ml-3">
                    <Label for="email">Email</Label>
                    <AvField className="form-control" name="email" id="email" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="document">Documento</Label>
                    <AvField className="form-control" name="document" id="document" required />
                  </FormGroup>
                </Col>
                <Col md={8}>
                  <FormGroup className="ml-3">
                    <Label for="public_place">Logradouro</Label>
                    <AvField className="form-control" name="public_place" id="public_place" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label for="complement">Complemento</Label>
                    <AvField className="form-control" name="complement" id="complement" required />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="number">Numero</Label>
                    <AvField className="form-control" name="number" id="number" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="district">Bairro</Label>
                    <AvField className="form-control" name="district" id="district" required />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="city">Cidade</Label>
                    <AvField className="form-control" name="city" id="city" required />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="state">Estado</Label>
                    <AvField className="form-control" name="state" id="state" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="country">País</Label>
                    <AvField className="form-control" name="country" id="country" required />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="zip_code">CEP</Label>
                    <AvField className="form-control" name="zip_code" id="zip_code" required />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="phone">Telefone</Label>
                    <AvField className="form-control" name="phone" id="phone" required />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Button className="mb-4 float-right float-down" color="success" type="submit">
                Adicionar fornecedor/doador
              </Button>
              <Button tag={Link} to="/user/fornecedor" className="mb-8 float-left" type="button" color="danger">
                Cancelar
              </Button>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  contact: store.contact.contact,
  createDonorSuccess: store.donor.createDonorSuccess,
  createDonorError: store.donor.createDonorError,
  createContactSuccess: store.contact.createContactSuccess,
  createContactError: store.contact.createContactError,
  loadingContact: store.contact.loading,
  loadingDonor: store.donor.loading,
});

const mapDispatchToProps = {
  createDonor,
  createContactForFornecedor,
  resetContact,
  resetDonor,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(AddFornecedor);
