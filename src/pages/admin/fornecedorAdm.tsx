import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from '../../shared/reducers';
import { getDonors, setToViewDonor } from '../../shared/reducers/donor.reducer';
import { getContactById } from '../../shared/reducers/contact.reducer';
interface IFornecedorProps extends StateProps, DispatchProps, RouteComponentProps {}

class Fornecedor extends React.Component<IFornecedorProps> {
  componentDidMount() {
    this.props.getDonors();
  }

  render() {
    const { donors } = this.props;
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-25 shadow-lg">
          <CardHeader className="bg-dark text-white">Fornecedores</CardHeader>
          <CardBody>
            <Link to="/admin/addFornecedor">
              <Button className="mb-4 float-right" color="success">
                Adicionar
              </Button>
            </Link>
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
                          this.props.history.push('/admin/addFornecedor');
                        }}
                        color="info"
                      >
                        <FontAwesomeIcon icon={faInfo} />
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
});

const mapDispatchToProps = {
  getDonors,
  setToViewDonor,
  getContactById,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
