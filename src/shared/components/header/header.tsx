import React, { useState } from 'react';
import 'styles/header.scss';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap';
import { ColorPallet } from '../../model/enum/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../reducers/authentication';
import { IRootState } from '../../reducers';
import { AUTHORITIES } from '../../../config/constants';

interface IHeaderProps extends StateProps, DispatchProps {}

function Header(props: IHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand="lg" className="sticky-top shadow bg-dark">
      <NavbarToggler
        onClick={toggle}
        style={{ backgroundColor: ColorPallet.orange, color: ColorPallet.white, padding: '10px' }}
        className="text-white"
      >
        <FontAwesomeIcon icon={faGripLines} color="white" />
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar className="w-100">
        <Nav className="d-flex w-100" navbar>
          {props.user.roles[0] === AUTHORITIES.USER ? (
            <>
              <Link className="header-option text-center" to="/user/estoque" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Estoque</h6>
              </Link>
              <Link className="header-option text-center" to="/user/fornecedor" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Fornecedor</h6>
              </Link>
              <Link className="header-option text-center" to="/user/setor" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Setor</h6>
              </Link>
              <Link className="header-option text-center" to="/user/transferir" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Produto</h6>
              </Link>
              <Link
                className="header-option text-center"
                to="/"
                style={{ textDecoration: 'none' }}
                onClick={props.logout}
              >
                <h6 className="text-white">Sair</h6>
              </Link>
            </>
          ) : (
            <>
              <Link className="header-option text-center" to="/admin/estoque" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Estoque</h6>
              </Link>
              <Link className="header-option text-center" to="/admin/fornecedor" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Fornecedor</h6>
              </Link>
              <Link className="header-option text-center" to="/admin/setor" style={{ textDecoration: 'none' }}>
                <h6 className="text-white">Setor</h6>
              </Link>
              <Link
                className="header-option text-center"
                to="/"
                style={{ textDecoration: 'none' }}
                onClick={props.logout}
              >
                <h6 className="text-white">Sair</h6>
              </Link>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

const mapStateToProps = (store: IRootState) => ({
  user: store.authentication.account,
});
const mapDispatchToProps = {
  logout,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Header);
