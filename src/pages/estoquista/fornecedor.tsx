import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
interface IFornecedorProps extends StateProps, DispatchProps {}

class Fornecedor extends React.Component<IFornecedorProps> {
  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-25 shadow-lg">
          <CardHeader className="bg-dark text-white">Fornecedor</CardHeader>
          <CardBody>
            <Button className="mb-4 float-right" color="success">
              Adicionar
            </Button>
            <Table hover>
              <tbody>
                <tr>
                  <th scope="row">Fornecedor 1</th>
                  <td>
                    <Button color="info">
                      <FontAwesomeIcon icon={faInfo} />
                    </Button>{' '}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fornecedor 2</th>
                  <td>
                    <Button color="info">
                      <FontAwesomeIcon icon={faInfo} />
                    </Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(Fornecedor);
