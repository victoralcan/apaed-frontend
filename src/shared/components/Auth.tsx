import React, { Component, ComponentProps } from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import APIUrl from '../../config/api';
import { getSession } from '../reducers/authentication';

export interface IAuthState {
  waitAuthCheck: boolean;
}

export interface IAuthProps extends StateProps, DispatchProps, ComponentProps<any> {}

class Auth extends Component<IAuthProps, IAuthState> {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([this.jwtCheck()]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = async () => {
    const token = localStorage.getItem('jwt_access_token');
    const { user } = this.props;
    if (token && !user.id) {
      APIUrl.defaults.headers.common.Authorization = token;
      await this.props.getSession();
    } else {
      window.location.href = window.location.host;
    }
  };

  render() {
    return this.state.waitAuthCheck ? <div>Checando token</div> : <>{this.props.children}</>;
  }
}

const mapStateToProps = (store: IRootState) => ({
  user: store.authentication.account,
});

const mapDispatchToProps = {
  getSession,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Auth);