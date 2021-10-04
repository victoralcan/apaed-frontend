import React, { useEffect, useState } from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { deleteDonor, getDonors, setToViewDonor } from '../../shared/reducers/donor.reducer';
import { AUTHORITIES } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from '../../shared/components/Table';
import { getContactById } from '../../shared/reducers/contact.reducer';

interface IFornecedorProps extends StateProps, DispatchProps, RouteComponentProps {}

function Fornecedor(props: IFornecedorProps): JSX.Element {
  const { donors, user, loading, totalCount } = props;
  const fetchIdRef = React.useRef(0);
  const [tablePageSize, setTablePageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    props.getDonors(0, 10);
    // eslint-disable-next-line
  }, []);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      setTablePageSize(pageSize);
      setCurrentPage(pageIndex);
      const skip = pageIndex * pageSize;
      const take = pageSize;
      props.getDonors(skip, take);
    }
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      Header: 'Doador/Fornecedor',
      columns: [
        {
          Header: 'Nome',
          accessor: 'name',
        },
        {
          Header: 'Opções',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: donor } }) => (
            <>
              <Button
                onClick={() => {
                  props.setToViewDonor(donor);
                  props.getContactById(donor.contact_id);
                  props.history.push(`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/viewFornecedor`);
                }}
                color="info"
              >
                <FontAwesomeIcon icon={faInfo} />
              </Button>

              <Button
                onClick={() => {
                  props.deleteDonor(donor.id);
                  props.getDonors(0, 10);
                }}
                color="trash"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <Card className="w-25 shadow-lg">
        <CardHeader className="bg-dark text-white">Fornecedores</CardHeader>
        <CardBody>
          <Button
            tag={Link}
            to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/addFornecedor`}
            className="mb-4 float-right"
            color="success"
          >
            Adicionar
          </Button>
          <Table
            columns={columns}
            data={donors}
            filterCriteria="name"
            filterBy="nome"
            fetchData={fetchData}
            loading={loading}
            pageCount={Math.ceil(props.totalCount / tablePageSize)}
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
  donors: store.donor.donors,
  user: store.authentication.account,
  loading: store.donor.loading,
  totalCount: store.donor.totalCount,
});

const mapDispatchToProps = {
  getDonors,
  setToViewDonor,
  getContactById,
  deleteDonor,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
