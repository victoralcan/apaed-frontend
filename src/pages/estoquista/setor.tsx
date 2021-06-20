import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
interface ISetorProps extends StateProps, DispatchProps {}

class Setor extends React.Component<ISetorProps> {
  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-25 shadow-lg">
          <CardHeader className="bg-dark text-white">Setores</CardHeader>
          <CardBody>
            <br></br>
            <br></br>
            <Table hover>
              <tbody>
                <tr>
                  <th scope="row">Cozinha</th>
                  <td>
                    <Link to="/user/verSetor">
                      <Button color="info">
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>{' '}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Panificação</th>
                  <td>
                    <Link to="/user/verSetor">
                      <Button color="info">
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>{' '}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Limpeza</th>
                  <td>
                    <Link to="/user/verSetor">
                      <Button color="info">
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>{' '}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Casa carinho</th>
                  <td>
                    <Link to="/user/verSetor">
                      <Button color="info">
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>{' '}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Bezerra de menezes</th>
                  <td>
                    <Link to="/user/verSetor">
                      <Button color="info">
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>{' '}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Setor);
