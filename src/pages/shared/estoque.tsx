import React, { useEffect, useState } from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { faArrowAltCircleRight, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStock, setProductToEdit } from '../../shared/reducers/stock.reducer';
import { IRootState } from '../../shared/reducers';
import { setToTransferProduct } from '../../shared/reducers/transfer.reducer';
import { formataData } from '../../shared/utils/formataData';
import { AUTHORITIES } from '../../config/constants';
import Table from '../../shared/components/Table';
import { differenceInCalendarDays, endOfToday } from 'date-fns';

interface IStockProps extends StateProps, DispatchProps {}

function Stock(props: IStockProps) {
  const { stock, user, loading, totalCount } = props;
  const fetchIdRef = React.useRef(0);
  const [tablePageSize, setTablePageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    props.getStock(0, 10);
    // eslint-disable-next-line
  }, []);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      setTablePageSize(pageSize);
      setCurrentPage(pageIndex);
      const skip = pageIndex * pageSize;
      const take = pageSize;
      props.getStock(skip, take);
    }
    // eslint-disable-next-line
  }, []);

  const dateCell = (date: string) => {
    if (date) {
      if (differenceInCalendarDays(new Date(date), endOfToday()) > 7) {
        return <div className="bg-success text-white">{formataData(new Date(date))}</div>;
      } else {
        return <div className="bg-danger text-white">{formataData(new Date(date))}</div>;
      }
    }
    return <div>Não aplicável</div>;
  };

  const columns = [
    {
      Header: 'Estoque',
      columns: [
        {
          Header: 'Codigo NCM',
          accessor: 'ncm_code',
        },
        {
          Header: 'Nome',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: productStock } }) => <div>{productStock.name + ' ' + productStock.brand}</div>,
        },
        {
          Header: 'Quantidade',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: productStock } }) => {
            const differenceQuantity = productStock.totalAmount - Number(productStock.minimal_qntt);
            const classNameQuantity =
              differenceQuantity < productStock.minimal_more_products
                ? differenceQuantity > 0
                  ? 'bg-warning text-white'
                  : 'bg-danger text-white'
                : 'bg-success text-white';
            return <div className={classNameQuantity}>{productStock.count + ' ' + productStock.unity_measurement}</div>;
          },
        },
        {
          Header: 'Data de Validade',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: productStock } }) => <>{dateCell(productStock.expiration_date)}</>,
        },
        {
          Header: 'Opções',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: productStock } }) => (
            <div>
              <Button
                className="mx-3"
                tag={Link}
                to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/transferir`}
                outline
                color="secondary"
                onClick={() => props.setToTransferProduct(productStock, productStock.count)}
              >
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </Button>
              <Button
                className="mx-3"
                tag={Link}
                to={`/cestaBasica`}
                outline
                color="secondary"
                onClick={() => props.setToTransferProduct(productStock, productStock.count)}
              >
                <FontAwesomeIcon icon={faBoxes} />
              </Button>
            </div>
          ),
        },
      ],
    },
  ];
  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <Card className="w-90 shadow-lg">
        <CardHeader className="bg-dark text-white">Estoque</CardHeader>
        <CardBody>
          <Table
            columns={columns}
            data={stock}
            filterCriteria="ncm_code"
            filterBy="Codigo NCM"
            fetchData={fetchData}
            loading={loading}
            pageCount={Math.ceil(totalCount / tablePageSize)}
            totalCount={totalCount}
            currentPage={currentPage}
            canGoToPage={false}
          />
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (store: IRootState) => ({
  stock: store.stock.stock,
  user: store.authentication.account,
  loading: store.stock.loading,
  totalCount: store.stock.totalCount,
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
