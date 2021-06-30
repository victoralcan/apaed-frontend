import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStock, setProductToEdit } from '../../shared/reducers/stock.reducer';
import { IRootState } from '../../shared/reducers';
import { setToTransferProduct } from '../../shared/reducers/transfer.reducer';
import { formataData } from '../../shared/utils/formataData';

interface IStockProps extends StateProps, DispatchProps {}

class Stock extends React.Component<IStockProps> {
  componentDidMount() {
    this.props.getStock();
  }

  render() {
    const { stock } = this.props;
    return (
      <>
        <div className="d-flex h-25 align-items-end" />
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Codigo NCM</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Data de Validade</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {stock &&
              stock.map((product) => {
                const differenceQuantity = product.totalAmount - product.minimal_qntt;
                const classNameQuantity =
                  differenceQuantity < 60
                    ? differenceQuantity > 30
                      ? 'bg-warning text-white'
                      : 'bg-danger text-white'
                    : '';
                return (
                  <tr key={product.product_id}>
                    <td>{product.ncm_code}</td>
                    <td>{product.name + ' ' + product.brand}</td>
                    <td className={classNameQuantity}>{product['count(*)'] + ' ' + product.unity_measurement}</td>
                    <td>
                      {product.expiration_date ? formataData(new Date(product.expiration_date)) : 'Não Aplicável'}
                    </td>
                    <td>
                      <Button
                        className="mx-3"
                        tag={Link}
                        to="/user/transferir"
                        outline
                        color="secondary"
                        onClick={() => this.props.setToTransferProduct(product)}
                      >
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  stock: store.stock.stock,
});
const mapDispatchToProps = {
  getStock,
  setProductToEdit,
  setToTransferProduct,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Stock);
