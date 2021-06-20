import React from 'react';

import '../../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { faArrowAltCircleRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IHomeProps extends StateProps, DispatchProps {}

class Estoque extends React.Component<IHomeProps> {
  render() {
    return (
      <>
        <div className="d-flex h-25 align-items-end">
          <Button className="mb-4">Pesquisar</Button>
        </div>
        <Table bordered responsive striped>
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
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>1</td>
              <td>Arroz</td>
              <td>30 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2</td>
              <td>Feijao</td>
              <td>20 KG</td>
              <td>20/10/2021</td>
              <td>
                <Link to="/user/editarProduto">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{' '}
                </Link>
                <Link to="/user/transferir">
                  <Button outline color="secondary">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  </Button>{' '}
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
        <div></div>
      </>
    );
  }
}
const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Estoque);
