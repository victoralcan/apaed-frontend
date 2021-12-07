import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Select from 'react-select';
import { AvField, AvForm, AvRadio, AvRadioGroup, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { getDonorByDocument, reset as resetDonor } from '../../shared/reducers/donor.reducer';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { getCategories, getCategoryById, reset as resetCategories } from '../../shared/reducers/category.reducer';
import { getProductsByNCM, reset as resetProducts } from '../../shared/reducers/product.reducer';
import { convertToDataInputFormat } from '../../shared/utils/convertToDataInputFormat';
import { convertDataInputFormatToDateServerFormat } from '../../shared/utils/convertDataInputFormatToDate';
import {
  createNewDonation,
  getDonationsForUser,
  reset as resetDonation,
  setDonation,
} from '../../shared/reducers/donation.reducer';
import { formataData } from '../../shared/utils/formataData';
import { IDonation } from '../../shared/model/donation.model';
import { IProductLocalDonationPostPut } from '../../shared/model/productLocalDonation.model';
import { registerNewProductToStock, resetSuccessRegister } from '../../shared/reducers/stock.reducer';
import { IOption } from '../../shared/model/option.model';
import { AUTHORITIES } from '../../config/constants';

interface IAddProdutoProps extends StateProps, DispatchProps, RouteComponentProps {}

interface IAddProdutoState {
  productType: IOption;
  category: IOption;
  donation: IOption;
  expiration_date?: string;
  hasExpirationDate: boolean;
  productsList: IProductLocalDonationPostPut[];
  isModalOpen: boolean;
}

class AddProduto extends React.Component<IAddProdutoProps, IAddProdutoState> {
  constructor(props) {
    super(props);
    this.state = {
      productType: {},
      category: {},
      donation: {},
      expiration_date: convertToDataInputFormat(new Date()),
      hasExpirationDate: true,
      productsList: [],
      isModalOpen: false,
    };
  }

  componentWillUnmount() {
    this.props.resetProducts();
    this.props.resetCategories();
    this.props.resetDonor();
    this.props.resetDonation();
  }

  componentDidUpdate(prevProps: Readonly<IAddProdutoProps>) {
    if (prevProps.donor.id !== this.props.donor.id) {
      this.props.getCategories(0, 1000000);
    }
  }

  changeProductType = (productType) => {
    if (productType) {
      this.setState({
        productType,
      });
    }
  };

  loadProductType = (category) => {
    if (category) {
      this.props.getProductsByNCM(category.value);
      this.props.getCategoryById(category.value);
      this.setState({
        category,
        productType: {},
      });
    }
  };

  setSelectedDonation = (donation) => {
    if (donation) {
      this.props.setDonation(this.props.donationsForUser.find((don) => don.id === donation.value));
      this.setState({
        donation,
      });
    }
  };

  handleDonorSubmit = (event, { document }) => {
    event.persist();
    this.props.getDonorByDocument(document);
  };

  handleValidSubmit = (event, { amount }) => {
    event.persist();
    const { productType, expiration_date, hasExpirationDate, category } = this.state;
    const { selectedDonation } = this.props;
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Produto adicionado!',
      text: 'Produto adicionado na lista!',
      icon: 'success',
    });
    const newProductLocalDonation: IProductLocalDonationPostPut = {
      product_id: String(productType.value),
      donation_id: selectedDonation.id,
      ncm_id: String(category.value),
      amount,
      // @ts-ignore
      expiration_date: hasExpirationDate ? convertDataInputFormatToDateServerFormat(expiration_date) : undefined,
      active: true,
      name: productType.label,
      category: category.label,
    };
    this.setState({
      productsList: [...this.state.productsList, newProductLocalDonation],
      productType: {},
      category: {},
      donation: {},
      expiration_date: convertToDataInputFormat(new Date()),
      hasExpirationDate: true,
    });
  };

  handleNewDonation = (event, { type }) => {
    event.persist();

    if (!type) {
      return;
    }

    const newDonation: IDonation = {
      donation_date: new Date().toISOString(),
      type,
      donor_id: this.props.donor.id,
      active: true,
    };
    this.props.createNewDonation(newDonation);
  };

  handleSubmitProductsList = () => {
    const { productsList } = this.state;
    productsList.forEach((product) => this.props.registerNewProductToStock(product));
  };

  render() {
    const {
      donor,
      getDonorSuccess,
      getDonorError,
      categories,
      products,
      getDonationsForUserSuccess,
      donationsForUser,
      selectedDonation,
      loadingDonation,
      registerNewProductToStockError,
      registerNewProductToStockSuccess,
      category,
      user,
      loadingStock,
    } = this.props;

    const { isModalOpen, productsList } = this.state;

    if (!getDonorSuccess && getDonorError) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Não encontrado!',
        text: 'Fornecedor/doador não encontrado com o documento informado!',
        icon: 'error',
      }).then(() => this.props.history.push(`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/fornecedor`));
      this.props.resetProducts();
      this.props.resetCategories();
      this.props.resetDonor();
      this.props.resetDonation();
    }

    if (registerNewProductToStockSuccess && !registerNewProductToStockError && !loadingStock) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Produtos Cadastrados',
        text: 'Produtos cadastrados com sucesso!',
        icon: 'success',
      }).then(() => {
        this.props.history.push(`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/estoque`);
      });
      this.props.resetSuccessRegister();
    }

    if (!getDonationsForUserSuccess && getDonorSuccess && !loadingDonation && !selectedDonation.id) {
      this.props.getDonationsForUser(donor.id);
    }

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar produto</CardHeader>
          <CardBody>
            {donor.id ? (
              getDonationsForUserSuccess && !selectedDonation.id ? (
                <AvForm id="select-donation-form" onValidSubmit={this.handleNewDonation}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="Type">Selecione a compra/doação</Label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          id="donations"
                          name="donations"
                          options={donationsForUser.map((donation) => ({
                            value: donation.id,
                            label: donation.type + ' ' + formataData(new Date(donation.donation_date)),
                            key: donation.id,
                          }))}
                          placeholder="Doações/Compras"
                          onChange={this.setSelectedDonation}
                          value={this.state.donation}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Col md={12}>
                    <FormGroup>
                      <Label for="langKey" style={{ paddingBottom: '0.5rem' }}>
                        Nova doação/compra? Selecione o tipo e clique no botão ao lado
                      </Label>
                      <AvRadioGroup id="langKey" name="type" inline>
                        <AvRadio customInput label="Compra" value="Compra" />
                        <AvRadio customInput label="Doação" value="Doação" />
                      </AvRadioGroup>
                    </FormGroup>
                  </Col>
                  <Button className="mb-4 float-right float-down mx-3" color="primary" type="submit">
                    Nova doação/compra
                  </Button>
                </AvForm>
              ) : (
                <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label for="Type">Fornecedor/Doador</Label>
                        <AvField
                          className="form-control"
                          name="document"
                          id="donor"
                          readOnly
                          value={donor.name}
                          errorMessage="Esse campo é obrigatório!"
                        />
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
                          options={categories.map((category) => ({
                            value: category.id,
                            label: category.description,
                            key: category.id,
                          }))}
                          placeholder="Categoria"
                          onChange={this.loadProductType}
                          value={this.state.category}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Button
                        tag={Link}
                        to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/addCategoria`}
                        className="mt-3 mx-3"
                        color="primary"
                      >
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
                          options={products.map((product) => ({
                            value: product.id,
                            label: product.name + ' ' + product.brand,
                            key: product.id,
                          }))}
                          placeholder="Tipo do produto"
                          noOptionsMessage={() => 'Selecione uma categoria'}
                          onChange={this.changeProductType}
                          value={this.state.productType}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Button
                        tag={Link}
                        to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/addTipoProduto`}
                        className="mt-3 mx-3"
                        color="primary"
                      >
                        Novo tipo de produto
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mr-4">
                        <Label for="amount">Quantidade ({category?.unity_measurement?.unity_measurement})</Label>
                        <AvField
                          className="form-control"
                          name="amount"
                          id="amount"
                          type="number"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Esse campo é obrigatório!',
                            },
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      {this.state.hasExpirationDate && (
                        <FormGroup>
                          <Label for="expiration_date">Data de validade</Label>
                          <Input
                            type="date"
                            name="expiration_date"
                            id="date"
                            value={this.state.expiration_date}
                            onChange={(event) =>
                              this.setState({
                                expiration_date: event.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      )}
                    </Col>
                    <Row>
                      <Label for="expiration_date">Tem data de validade?</Label>&nbsp;
                      <AvCheckboxGroup name="hasExpirationDate">
                        <AvCheckbox
                          value={this.state.hasExpirationDate}
                          checked={this.state.hasExpirationDate}
                          onChange={(event) => this.setState({ hasExpirationDate: event?.target?.checked ?? false })}
                        />
                      </AvCheckboxGroup>
                    </Row>
                  </Row>
                  <br />
                  <Button
                    className="mb-4 float-right float-down"
                    color="primary"
                    type="button"
                    onClick={() => this.setState({ isModalOpen: true })}
                  >
                    Ver Lista
                  </Button>
                  <Button className="mb-8 float-right mx-3" color="warning" type="submit">
                    Adicionar produto na lista
                  </Button>
                  <Button
                    tag={Link}
                    to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/estoque`}
                    className="mb-8 float-left"
                    type="button"
                    color="danger"
                  >
                    Cancelar
                  </Button>
                  <Modal isOpen={isModalOpen} toggle={() => this.setState({ isModalOpen: !isModalOpen })}>
                    <ModalHeader toggle={() => this.setState({ isModalOpen: !isModalOpen })}>Lista</ModalHeader>
                    <ModalBody>
                      {productsList.length > 0 ? (
                        productsList.map((product, i) => <div key={i}>{product.name}</div>)
                      ) : (
                        <div>Ainda não há produtos na lista</div>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="success"
                        onClick={() => {
                          this.handleSubmitProductsList();
                          this.setState({ isModalOpen: !isModalOpen });
                        }}
                      >
                        Salvar Produtos
                      </Button>
                      &nbsp;
                      <Button color="secondary" onClick={() => this.setState({ isModalOpen: !isModalOpen })}>
                        Sair
                      </Button>
                    </ModalFooter>
                  </Modal>
                </AvForm>
              )
            ) : (
              <AvForm id="search-donor-form" onValidSubmit={this.handleDonorSubmit}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Type">Pesquise pelo fornecedor/doador</Label>
                      <AvField
                        className="form-control"
                        name="document"
                        id="donor"
                        placeholder="Digite o documento"
                        required
                        errorMessage="Esse campo é obrigatório!"
                      />
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
  categories: store.category.categories,
  category: store.category.category,
  products: store.product.products,
  donationsForUser: store.donation.donationsForUser,
  getDonationsForUserSuccess: store.donation.getDonationsForUserSuccess,
  selectedDonation: store.donation.selectedDonation,
  loadingDonation: store.donation.loading,
  registerNewProductToStockSuccess: store.stock.registerNewProductToStockSuccess,
  registerNewProductToStockError: store.stock.registerNewProductToStockError,
  user: store.authentication.account,
  loadingStock: store.stock.loading,
});

const mapDispatchToProps = {
  getDonorByDocument,
  getCategories,
  getProductsByNCM,
  getDonationsForUser,
  getCategoryById,
  createNewDonation,
  setDonation,
  registerNewProductToStock,
  resetProducts,
  resetDonor,
  resetCategories,
  resetDonation,
  resetSuccessRegister,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(AddProduto);
