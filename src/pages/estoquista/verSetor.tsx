import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { IRootState } from '../../shared/reducers';
import { IContact } from '../../shared/model/contact.model';
import { ILocal } from '../../shared/model/local.model';
import { createLocal, reset as resetLocal } from '../../shared/reducers/local.reducer';
import { createContactForLocal, reset as resetContact } from '../../shared/reducers/contact.reducer';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

interface IVerSetorProps extends StateProps, DispatchProps, RouteComponentProps {}

interface IVerSetorState {
  readOnly: boolean;
}

class VerSetor extends React.Component<IVerSetorProps, IVerSetorState> {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
    };
  }

  componentDidMount() {
    if (this.props.toViewLocal.id) {
      this.setState({ readOnly: true });
    }
  }

  componentWillUnmount() {
    this.props.resetLocal();
    this.props.resetContact();
  }

  handleValidSubmit = (
    event,
    { name, document, public_place, complement, number, district, city, state, country, zip_code, phone },
  ) => {
    event.persist();
    const newLocal: ILocal = {
      name,
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
    this.props.createContactForLocal(newContact, newLocal);
  };

  render() {
    const { readOnly } = this.state;

    const {
      toViewLocal,
      toViewContact,
      createLocalSuccess,
      createLocalError,
      createContactSuccess,
      createContactError,
    } = this.props;

    if (!createLocalSuccess && createLocalError) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Erro!',
        text: 'Erro ao criar o setor! Por favor, tente novamente!',
        // @ts-ignore
        type: 'error',
      });
    }

    if (createContactSuccess && !createContactError && !createLocalError && createLocalSuccess) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Setor Cadastrado',
        text: 'Setor cadastrado com sucesso!',
        // @ts-ignore
        type: 'success',
      }).then(() => {
        this.props.resetContact();
        this.props.resetLocal();
        this.props.history.push('/user/setor');
      });
    }

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Setor</CardHeader>
          <CardBody>
            <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Nome</Label>
                    <AvField
                      className="form-control"
                      name="name"
                      id="name"
                      required
                      readOnly={readOnly}
                      value={toViewLocal.name}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="ml-3">
                    <Label for="document">Documento</Label>
                    <AvField
                      className="form-control"
                      name="document"
                      id="document"
                      required
                      readOnly={readOnly}
                      value={toViewLocal.document}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label for="public_place">Logradouro</Label>
                    <AvField
                      className="form-control"
                      name="public_place"
                      id="public_place"
                      required
                      value={toViewContact.public_place}
                      readOnly={readOnly}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label for="complement">Complemento</Label>
                    <AvField
                      className="form-control"
                      name="complement"
                      id="complement"
                      required
                      readOnly={readOnly}
                      value={toViewContact.complement}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="number">Numero</Label>
                    <AvField
                      className="form-control"
                      name="number"
                      id="number"
                      required
                      readOnly={readOnly}
                      value={toViewContact.number}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="district">Bairro</Label>
                    <AvField
                      className="form-control"
                      name="district"
                      id="district"
                      required
                      readOnly={readOnly}
                      value={toViewContact.district}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="city">Cidade</Label>
                    <AvField
                      className="form-control"
                      name="city"
                      id="city"
                      required
                      readOnly={readOnly}
                      value={toViewContact.city}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="state">Estado</Label>
                    <AvField
                      className="form-control"
                      name="state"
                      id="state"
                      required
                      readOnly={readOnly}
                      value={toViewContact.state}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="country">País</Label>
                    <AvField
                      className="form-control"
                      name="country"
                      id="country"
                      required
                      readOnly={readOnly}
                      value={toViewContact.country}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="zip_code">CEP</Label>
                    <AvField
                      className="form-control"
                      name="zip_code"
                      id="zip_code"
                      required
                      readOnly={readOnly}
                      value={toViewContact.zip_code}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup className="ml-3">
                    <Label for="phone">Telefone</Label>
                    <AvField
                      className="form-control"
                      name="phone"
                      id="phone"
                      required
                      readOnly={readOnly}
                      value={toViewContact.phone}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              {!toViewLocal.id && (
                <Button className="mb-4 float-right float-down" color="success" type="submit">
                  Adicionar setor
                </Button>
              )}
              <Button tag={Link} to="/user/setor" className="mb-4 float-left" color="danger">
                Voltar
              </Button>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  toViewLocal: store.local.toViewLocal,
  toViewContact: store.contact.toViewContact,
  createLocalSuccess: store.local.createLocalSuccess,
  createLocalError: store.local.createLocalError,
  createContactSuccess: store.contact.createContactSuccess,
  createContactError: store.contact.createContactError,
});

const mapDispatchToProps = {
  createLocal,
  createContactForLocal,
  resetContact,
  resetLocal,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(VerSetor);
