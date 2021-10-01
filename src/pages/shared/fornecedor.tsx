import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from '../../shared/reducers';
import { getDonors, setToViewDonor, deleteDonor } from '../../shared/reducers/donor.reducer';
import { getContactById } from '../../shared/reducers/contact.reducer';
import { AUTHORITIES } from '../../config/constants';
interface IFornecedorProps extends StateProps, DispatchProps, RouteComponentProps {}

class Fornecedor extends React.Component<IFornecedorProps> {
  componentDidMount() {
    this.props.getDonors(0, 10);
  }

  render() {
    const { donors, user } = this.props;
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
            <Table hover>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id}>
                    <th scope="row">{donor.name}</th>
                    <td>
                      <Button
                        onClick={() => {
                          this.props.setToViewDonor(donor);
                          this.props.getContactById(donor.contact_id);
                          this.props.history.push(
                            `/${user.role.name === AUTHORITIES.ADMIN ? 'admin' : 'user'}/viewFornecedor`,
                          );
                        }}
                        color="info"
                      >
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>

                      <Button
                        onClick={() => {
                          this.props.deleteDonor(donor.id);
                          this.props.getDonors(0, 10);
                        }}
                        color="trash"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (store: IRootState) => ({
  donors: store.donor.donors,
  user: store.authentication.account,
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
