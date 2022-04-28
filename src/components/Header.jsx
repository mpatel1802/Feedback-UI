import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header(props /*{text}*/) {
  return (
    <header style={{ backgroundColor: props.bgColor, color: props.textColor }}>
      <div className="container">
        <Link to='/' className='link'>
          <h2>{props.text}</h2>
        </Link>
      </div>
    </header>
  );
}

Header.defaultProps = {
    text: "Feedback UI",
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95'
}

Header.propTypes = {
    text: PropTypes.string
}

export default Header