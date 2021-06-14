import React from 'react';

import '../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

interface IHomeProps extends StateProps, DispatchProps {}

class Home extends React.Component<IHomeProps> {
  render() {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Codigo NCM</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Data de Validade</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>Seta</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>Seta</td>
            </tr>
          </tbody>
        </Table>
        <div>blablabla</div>
      </>
    );
  }
}
const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
