import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { IRootState } from '../../shared/reducers';
import { getLocals, setToViewLocal } from '../../shared/reducers/local.reducer';
import { getContactById } from '../../shared/reducers/contact.reducer';
interface ISetorProps extends StateProps, DispatchProps, RouteComponentProps {}

class Setor extends React.Component<ISetorProps> {
  componentDidMount() {
    this.props.getLocals();
  }

  render() {
    const { locals } = this.props;
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-25 shadow-lg">
          <CardHeader className="bg-dark text-white">Setores</CardHeader>
          <CardBody>
            <Button tag={Link} to="/user/verSetor" className="mb-4 float-right" color="success">
              Adicionar
            </Button>
            <Table hover>
              <tbody>
                {locals.map((local) => (
                  <tr key={local.id}>
                    <th scope="row">{local.name}</th>
                    <td>
                      <Button
                        onClick={() => {
                          this.props.setToViewLocal(local);
                          this.props.getContactById(local.contact_id);
                          this.props.history.push('/user/verSetor');
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
  locals: store.local.locals,
});
const mapDispatchToProps = {
  getLocals,
  setToViewLocal,
  getContactById,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Setor);
