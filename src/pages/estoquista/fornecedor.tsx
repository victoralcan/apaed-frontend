import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from '../../shared/reducers';
import { getDonors } from '../../shared/reducers/donor.reducer';
interface IFornecedorProps extends StateProps, DispatchProps {}

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
            <Button tag={Link} to="/user/addFornecedor" className="mb-4 float-right" color="success">
              Adicionar
            </Button>
            <Table hover>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id}>
                    <th scope="row">{donor.name}</th>
                    <td>
                      <Link to="/user/verFornecedor">
                        <Button color="info">
                          <FontAwesomeIcon icon={faInfo} />
                        </Button>
                      </Link>
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
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
