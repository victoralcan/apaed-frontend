import React, { useEffect, useMemo } from 'react';
import { IRootState } from '../../shared/reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Table from '../../shared/components/Table';
import { getTransfers } from '../../shared/reducers/transfer.reducer';

interface ITransfersProps extends StateProps, DispatchProps, RouteComponentProps {}

function Transfers(props: ITransfersProps): JSX.Element {
  const columns = useMemo(
    () => [
      {
        Header: 'Transferências',
        columns: [
          {
            Header: 'Descrição',
            accessor: 'description',
          },
          {
            Header: 'Nome',
            accessor: 'product_name',
          },
          {
            Header: 'Marca',
            accessor: 'product_brand',
          },
          {
            Header: 'Quantidade',
            accessor: 'total_amount_transfered',
          },
          {
            Header: 'Destino',
            accessor: 'destiny.name',
          },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    props.getTransfers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-3">
      <Table
        columns={columns}
        data={props.transfers}
        filterCriteria="productLocalDonation.product.name"
        filterBy="nome do produto"
      />
    </div>
  );
}

const mapStateToProps = (store: IRootState) => ({
  transfers: store.transfer.transfers,
});
const mapDispatchToProps = {
  getTransfers,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Transfers);
