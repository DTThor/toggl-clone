import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { removeUser } from '../../utils/userUtils';
import logo from '../../../static/Moove_It-Logo_W.png';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { logout, history } = this.props;
    removeUser();
    logout();
    history.push('/');
  }

  render() {
    const {
      isLoggedIn,
      user: { email },
    } = this.props;

    const renderLogin = (
      <Link
        to="/login"
        className="shadow-hover h2 flex items-center f6 mooveItPink hover-white bg-animate no-underline pv1 ph3 ma2 br-pill b--black"
      >
        Log In
      </Link>
    );

    const renderEmail = (
      <div className="f6 dib center mooveItPink bg-animate no-underline pt2 ph2">
        <Dropdown className="account-dropdown shadow-hover outline-0 mooveItNavybg mooveItNavyBorder hover-white h2 f6 mooveItPink no-underline">
          <DropdownTrigger className="shadow-hover center outline-0 mooveItNavybg mooveItNavyBorder hover-white h2 f6 mooveItPink no-underline">
            {email}
          </DropdownTrigger>
          <DropdownContent>
            <button
              className="shadow-hover ph3 mt1 outline-0 mooveItNavybg br-pill br--white hover-white h2 f6 mooveItPink no-underline"
              onClick={this.handleClick}
            >
              Log Out
            </button>
          </DropdownContent>
        </Dropdown>
      </div>
    );

    return (
      <nav className="flex justify-between mooveItNavybg">
        <Link className="link mooveItPink no-underline flex items-center pa3" to="/">
          <FontAwesomeIcon className="mooveItPinkBorder ba bw1 br-100 mooveItTeal" icon={faClock} />
          <h4 className="pl1">Minutero</h4>
        </Link>

        <img className="mooveItNavybg pt4 mt2 h1" src={logo} alt="Moove-it logo" />

        <div className="flex-grow pa2 flex items-center">
          {isLoggedIn ? renderEmail : renderLogin}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(Navbar);
