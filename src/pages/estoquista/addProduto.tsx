import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { AvForm, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { FormGroup, Label, Input, Card, CardBody, CardHeader, Button, Col, Row } from 'reactstrap';

interface IAddProdutoProps extends StateProps, DispatchProps {}

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

  handleValidSubmit = (event, values) => {
    event.persist();
  };

  render() {
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

    const fornecedores = [
      {
        value: 1,
        label: 'Casa Carinho',
        key: 1,
      },
    ];
    return (
      <div className="d-flex h-150 align-items-center justify-content-center">
        <Card className="w-50 shadow-lg">
          <CardHeader className="bg-dark text-white">Adicionar produto</CardHeader>
          <CardBody>
            <AvForm id="add-product-form" onValidSubmit={this.handleValidSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Type">Selecione o fornecedor</Label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      id="fornecedor"
                      name="fornecedor"
                      options={fornecedores.map((fornecedor) => ({
                        value: fornecedor.value,
                        label: fornecedor.label,
                        key: fornecedor.key,
                      }))}
                      placeholder="Fornecedor"
                      noOptionsMessage="Selecione um fornecedor"
                      onChange={this.changeDonor}
                      value={this.state.donor}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
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
                <Col md={12}>
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
                <Col md={12}>
                  <FormGroup>
                    <Label for="exapleNumber">Quantidade</Label>
                    <Input type="number" name="amount" id="amount" />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="exampleDate">Data de validade</Label>
                    <Input type="date" name="date" id="exampleDate" />
                  </FormGroup>
                </Col>
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
              <Button tag={Link} to="/user/addProduto" className="mb-8 float-right mx-3" color="warning" type="submit">
                Adicionar mais produtos
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

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddProduto);
