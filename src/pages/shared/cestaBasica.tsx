import React, { useEffect, useState } from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { IRootState } from '../../shared/reducers';
import { deleteFoodStamp, getFoodStamps, setToViewFoodStamp, reset } from '../../shared/reducers/food-stamp.reducer';
import { AUTHORITIES } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from '../../shared/components/Table';
import { getContactById } from '../../shared/reducers/contact.reducer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface IFoodStampsProps extends StateProps, DispatchProps, RouteComponentProps {}

function CestaBasica(props: IFoodStampsProps): JSX.Element {
  const { foodStamps, user, loading, totalCount, deleteFoodStampError, deleteFoodStampSuccess } = props;
  const fetchIdRef = React.useRef(0);
  const [tablePageSize, setTablePageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // props.get;
    props.getFoodStamps(0, 10);
    // eslint-disable-next-line
  }, []);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    if (fetchId === fetchIdRef.current) {
      setTablePageSize(pageSize);
      setCurrentPage(pageIndex);
      const skip = pageIndex * pageSize;
      const take = pageSize;
      props.getFoodStamps(skip, take);
    }
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      Header: 'Cestas básicas',
      columns: [
        {
          Header: 'Nome',
          accessor: 'name',
        },
        {
          Header: 'Opções',
          accessor: (originalRow) => originalRow,
          // eslint-disable-next-line react/display-name
          Cell: ({ cell: { value: foodStamp } }) => (
            <>
              <Button
                onClick={() => {
                  props.setToViewFoodStamp(foodStamp);
                  // props.getContactById(foodStamp.id);
                  props.history.push(`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/viewCestaBasica`);
                }}
                color="info"
              >
                <FontAwesomeIcon icon={faInfo} />
              </Button>

              <Button
                onClick={() => {
                  Swal.fire({
                    title: 'Deseja deletar a Cesta básica?',
                    confirmButtonText: 'Deletar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.deleteFoodStamp(foodStamp.id);
                      if (deleteFoodStampSuccess && !deleteFoodStampError && !loading) {
                        const MySwal = withReactContent(Swal);
                        MySwal.fire({
                          title: 'Cesta básica deletado!',
                          text: 'Cesta básica deletado com sucesso!',
                          icon: 'success',
                        }).then(() => {
                          props.reset();
                          props.history.push('/admin/cestaBasica');
                        });
                      }
                    } else if (!deleteFoodStampSuccess && deleteFoodStampError && !loading) {
                      const MySwal = withReactContent(Swal);
                      MySwal.fire({
                        title: 'Erro!',
                        text: 'Erro ao deletar Cesta básica! Por favor, tente novamente!',
                        icon: 'error',
                      });
                    }
                  });
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
        <CardHeader className="bg-dark text-white">Cestas básicas</CardHeader>
        <CardBody>
          {user.role.name === AUTHORITIES.ADMIN && (
            <Button
              tag={Link}
              to={`/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/addCestaBasica`}
              className="mb-4 float-right"
              color="success"
            >
              Adicionar
            </Button>
          )}
          <Table
            columns={columns}
            data={foodStamps}
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
  foodStamps: store.foodStamp.foodStamps,
  user: store.authentication.account,
  loading: store.foodStamp.loading,
  totalCount: store.foodStamp.totalCount,
  deleteFoodStampError: store.foodStamp.deleteFoodStampError,
  deleteFoodStampSuccess: store.foodStamp.deleteFoodStampSuccess,
});

const mapDispatchToProps = {
  getFoodStamps,
  setToViewFoodStamp,
  getContactById,
  deleteFoodStamp,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CestaBasica);
