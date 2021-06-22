import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { makeTransfer, resetSuccessTransfer } from '../../shared/reducers/transfer.reducer';
import { ITransfer } from '../../shared/model/transfer.model';
import { getLocals } from '../../shared/reducers/local.reducer';
import { IOption } from '../../shared/model/option.model';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

interface ITransferirProps extends StateProps, DispatchProps, RouteComponentProps {}

interface ITransferirState {
  description: string;
  destiny: IOption;
}

class Transferir extends React.Component<ITransferirProps, ITransferirState> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      destiny: {},
    };
  }

  componentDidMount() {
    this.props.getLocals();
  }

  setSelectedDestiny = (destiny) => {
    if (destiny) {
      this.setState({
        destiny,
      });
    }
  };

  handleValidSubmit = (event, { amount }) => {
    event.persist();
    const newTransfer: ITransfer = {
      description: this.state.description,
      product_local_donation_id: this.props.toTransferProduct.id,
      amount,
      destiny_id: String(this.state.destiny.value),
    };
    this.props.makeTransfer(newTransfer);
  };

  render() {
    const { toTransferProduct, locals, user, makeTransferSuccess, makeTransferError } = this.props;
    const localsWithoutSelf = locals.filter((local) => local.id !== user.local_id);
    if (!makeTransferError && makeTransferSuccess) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Transfêrencia Realizada!',
        text: 'A sua transferência foi realizada com sucesso!',
        // @ts-ignore
        type: 'success',
      }).then(() => this.props.history.push('/user/estoque'));
      this.props.resetSuccessTransfer();
    }
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Transferir produto</CardHeader>
          <CardBody>
            <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup row>
                    <Label for="exampleEmail">Codigo NCM</Label>
                    <Input readOnly name="ncm_code" value={toTransferProduct.ncm_code} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup row>
                    <Label for="exampleEmail">Nome</Label>
                    <Input readOnly name="name" value={toTransferProduct.name} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mr-4">
                    <Label for="amount">Quantidade</Label>
                    <AvField className="form-control" name="amount" id="amount" required />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Type">Selecione o destino</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      id="destiny"
                      name="destiny"
                      options={localsWithoutSelf.map((local) => ({
                        value: local.id,
                        label: local.name,
                        key: local.id,
                      }))}
                      placeholder="Local de Destino"
                      onChange={this.setSelectedDestiny}
                      value={this.state.destiny}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="description">Motivo da tranferência</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={(event) => this.setState({ description: event.target.value })}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Button className="mb-4 float-right float-down" color="success" type="submit">
                Transferir produto
              </Button>
              <Button tag={Link} to="/user/estoque" className="mb-8 float-left" type="button" color="danger">
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
  toTransferProduct: store.transfer.toTransferProduct,
  locals: store.local.locals,
  user: store.authentication.account,
  makeTransferSuccess: store.transfer.makeTransferSuccess,
  makeTransferError: store.transfer.makeTransferError,
});

const mapDispatchToProps = {
  makeTransfer,
  getLocals,
  resetSuccessTransfer,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Transferir);
