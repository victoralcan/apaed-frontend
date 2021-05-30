import React from 'react';

import '../styles/pages/login.scss';
import { connect } from 'react-redux';

interface ILoginProps extends StateProps, DispatchProps {}

class Login extends React.Component<ILoginProps> {
  render() {
    return <div>Login</div>;
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
