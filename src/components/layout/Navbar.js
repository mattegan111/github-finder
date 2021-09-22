import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const Navbar = ({title}) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
          <FontAwesomeIcon icon={faGithub} />{title}
      </h1>
      <ul>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.defaultProps = {
  title: 'Github Finder'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Navbar;
