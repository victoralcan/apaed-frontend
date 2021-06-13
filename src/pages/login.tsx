import React from 'react';

import '../styles/pages/login.scss';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

interface ILoginProps extends StateProps, DispatchProps {}

class Login extends React.Component<ILoginProps> {
  handleSubmit = (event, errors, { username, password }) => {
    event.persist();
    if (errors.length === 0) console.log('Loguei!');
  };

  render() {
    return (
      <div className="d-flex h-100 align-items-center justify-content-center">
        <Card className="w-25 shadow-lg">
          <CardHeader className="bg-dark text-white">Login</CardHeader>
          <CardBody>
            <AvForm onSubmit={this.handleSubmit}>
              <Row>
                <Col md="12">
                  <AvField
                    name="username"
                    label="Nome de Usuario"
                    placeholder="Nome de Usuario"
                    autoFocus
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'O nome de usuário é obrigatório!',
                      },
                      minLength: {
                        value: 4,
                        errorMessage: 'O nome de usuário deve ter no minimo 4 letras',
                      },
                      maxLength: {
                        value: 20,
                        errorMessage: 'O nome de usuário deve ter no maximo 20 letras',
                      },
                    }}
                  />
                  <AvField
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="Senha"
                    required
                    errorMessage="Erro Senha"
                  />
                </Col>
              </Row>
              <div className="mt-1">&nbsp;</div>
              <Link to="/home">
                <Button color="secondary" type="submit">
                  Logar
                </Button>
              </Link>
            </AvForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
