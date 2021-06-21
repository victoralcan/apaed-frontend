import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Select from 'react-select';
import { AvField, AvForm, AvRadio, AvRadioGroup } from 'availity-reactstrap-validation';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { getDonorByDocument, reset } from '../../shared/reducers/donor.reducer';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

interface IAddProdutoProps extends StateProps, DispatchProps, RouteComponentProps {}

interface IOption {
  value?: number;
  label?: string;
  key?: number;
}

interface IAddProdutoState {
  productType: IOption;
  category: IOption;
  donor: IOption;
}

class AddProduto extends React.Component<IAddProdutoProps, IAddProdutoState> {
  constructor(props) {
    super(props);
    this.state = {
      productType: {},
      category: {},
      donor: {},
    };
  }

  changeProductType = (productType) => {
    if (productType) {
      this.setState({
        productType: productType,
      });
    }
  };

  changeDonor = (donor) => {
    if (donor) {
      this.setState({
        donor: donor,
      });
    }
  };

  loadProductType = (category) => {
    if (category) {
      // Chamar no backend as categorias
      this.setState({
        category: category,
      });
    }
  };

  handleDonorSubmit = (event, { document }) => {
    event.persist();
    this.props.getDonorByDocument(document);
  };

  handleValidSubmit = (event, values) => {
    event.persist();
  };

  render() {
    const { donor, getDonorSuccess, getDonorError } = this.props;
    const tipoProduto = [
      {
        value: 1,
        label: 'Arroz São Joao',
        key: 1,
      },
    ];

    const categorias = [
      {
        value: 1,
        label: 'Arroz Branco parbolizado',
        key: 1,
      },
    ];

    if (!getDonorSuccess && getDonorError) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Não encontrado!',
        text: 'Fornecedor/doador não encontrado com o documento informado!',
        // @ts-ignore
        type: 'error',
      }).then(() => this.props.history.push('/user/fornecedor'));
      this.props.reset();
    }

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar produto</CardHeader>
          <CardBody>
            {donor.id ? (
              <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="Type">Fornecedor/Doador</Label>
                      <AvField className="form-control" name="document" id="donor" readOnly value={donor.name} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col md={8}>
                    <FormGroup>
                      <Label for="Type">Categoria</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        id="category"
                        name="category"
                        options={categorias.map((category) => ({
                          value: category.value,
                          label: category.label,
                          key: category.key,
                        }))}
                        placeholder="Categoria"
                        noOptionsMessage="Selecione uma categoria"
                        onChange={this.loadProductType}
                        value={this.state.category}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <Button tag={Link} to="/user/addCategoria" className="mt-3 mx-3" color="primary">
                      Nova categoria
                    </Button>
                  </Col>
                </Row>
                <Row className="d-flex align-items-center">
                  <Col md={8}>
                    <FormGroup>
                      <Label for="Type">Produto</Label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        id="productType"
                        name="productType"
                        options={tipoProduto.map((product) => ({
                          value: product.value,
                          label: product.label,
                          key: product.key,
                        }))}
                        placeholder="Tipo do produto"
                        noOptionsMessage="Selecione uma categoria"
                        onChange={this.changeProductType}
                        value={this.state.productType}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <Button tag={Link} to="/user/addTipoProduto" className="mt-3 mx-3" color="primary">
                      Novo tipo de produto
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup className="mr-4">
                      <Label for="exapleNumber">Quantidade</Label>
                      <Input type="number" name="amount" id="amount" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleDate">Data de validade</Label>
                      <Input type="date" name="date" id="exampleDate" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="langKey" style={{ paddingBottom: '0.5rem' }}>
                        Esse produto é:
                      </Label>
                      <AvRadioGroup id="langKey" name="langKey" inline>
                        <AvRadio customInput label="Compra" value="compra" />
                        <AvRadio customInput label="Doação" value="doacao" />
                      </AvRadioGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Button
                  tag={Link}
                  to="/user/estoque"
                  className="mb-4 float-right float-down"
                  color="success"
                  type="submit"
                >
                  Adicionar produto
                </Button>
                <Button
                  tag={Link}
                  to="/user/addProduto"
                  className="mb-8 float-right mx-3"
                  color="warning"
                  type="submit"
                >
                  Adicionar mais produtos
                </Button>
                <Button tag={Link} to="/user/estoque" className="mb-8 float-left" type="button" color="danger">
                  Cancelar
                </Button>
              </AvForm>
            ) : (
              <AvForm id="add-product-form" onValidSubmit={this.handleDonorSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Type">Pesquise pelo fornecedor/doador</Label>
                      <AvField className="form-control" name="document" id="donor" placeholder="Digite o documento" />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Button className="mb-4 float-right float-down" color="success" type="submit">
                  Pesquisar
                </Button>
              </AvForm>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  donor: store.donor.donor,
  getDonorError: store.donor.getDonorError,
  getDonorSuccess: store.donor.getDonorSuccess,
});
const mapDispatchToProps = {
  getDonorByDocument,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(AddProduto);
