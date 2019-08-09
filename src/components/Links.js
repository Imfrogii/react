import React from 'react';
import { Link } from 'react-scroll'
import PropTypes from 'prop-types'

let Links = (props) => {
  return (
    <Link activeClass="active" to={props.to} spy={true} smooth={true}
      offset={-70} duration= {500}>{props.children}</Link>
  );
}

Links.propTypes= {
  to: PropTypes.string,
  children: PropTypes.node,
}

export default Links;
