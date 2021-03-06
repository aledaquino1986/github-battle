import React from "react";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/theme";

const Card = ({ header, subheader, avatar, name, href, children }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <div className={`card bg-${theme}`}>
      <h4 className="header-lg center-text">{header}</h4>
      <img className="avatar" src={avatar} alt={`Avatar from ${name}`} />

      {subheader && <h4 className="center-text">{subheader}</h4>}

      <h2 className="center-text">
        <a href={href} className="link">
          {name}
        </a>
      </h2>
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
