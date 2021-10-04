import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Label, Row } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import Select from 'react-select';
import { getCategories } from '../../shared/reducers/category.reducer';
import { IOption } from '../../shared/model/option.model';
import { IProduct } from '../../shared/model/product.model';
import { createProduct, reset } from '../../shared/reducers/product.reducer';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

interface IAddTipoProdutoProps extends StateProps, DispatchProps, RouteComponentProps {}

interface IAddTipoProdutoState {
  selectedCategory: IOption;
}

class AddTipoProduto extends React.Component<IAddTipoProdutoProps, IAddTipoProdutoState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
    };
  }

  componentDidMount() {
    this.props.getCategories(0, 1000000);
  }

  handleCategoryChange = (category) => {
    if (category) {
      this.setState({
        selectedCategory: category,
      });
    }
  };

  handleValidSubmit = (event, { name, brand }) => {
    event.persist();
    const { selectedCategory } = this.state;
    const newProduct: IProduct = {
      name,
      brand,
      ncm_id: String(selectedCategory.value),
      active: true,
    };
    this.props.createProduct(newProduct);
  };

  render() {
    const { categories, createProductSuccess, createProductError, loading } = this.props;

    if (!createProductSuccess && createProductError) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Erro!',
        text: 'Erro ao criar o tipo de produto! Por favor, tente novamente!',
        // @ts-ignore
        type: 'error',
      });
    }

    if (createProductSuccess && !createProductError && !loading) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: 'Tipo de produto Cadastrado',
        text: 'Tipo de produto cadastrado com sucesso!',
        // @ts-ignore
        type: 'success',
      }).then(() => {
        this.props.history.push('/user/addProduto');
      });
      this.props.reset();
    }

    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar tipo produto</CardHeader>
          <CardBody>
            <AvForm id="add-category-form" onValidSubmit={this.handleValidSubmit}>
              <Row className="d-flex align-items-center">
                <Col md={6}>
                  <FormGroup>
                    <Label for="category">Categoria</Label>
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
                      placeholder="category"
                      onChange={this.handleCategoryChange}
                      value={this.state.selectedCategory}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="mx-4">
                    <Label for="name">Nome</Label>
                    <AvField
                      className="form-control"
                      name="name"
                      id="name"
                      required
                      errorMessage="Esse campo é obrigatório!"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="d-flex align-items-center">
                <Col md={6}>
                  <FormGroup>
                    <Label for="brand">Marca</Label>
                    <AvField
                      className="form-control"
                      name="brand"
                      id="brand"
                      required
                      errorMessage="Esse campo é obrigatório!"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <Button type="submit" className="mb-4 float-right float-down" color="success">
                Adicionar tipo de produto
              </Button>
              <Button tag={Link} to="/user/addProduto" type="button" className="mb-8 float-left" color="danger">
                Cancelar
              </Button>
            </AvForm>
            <br />
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  categories: store.category.categories,
  createProductSuccess: store.product.createProductSuccess,
  createProductError: store.product.createProductError,
  loading: store.product.loading,
});
const mapDispatchToProps = {
  getCategories,
  createProduct,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(AddTipoProduto);
