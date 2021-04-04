import React, { Component } from "react";
import PropTypes from "prop-types";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "CSS", "Python", "Java"];
  return (
    <ul className="flex-center">
      {languages.map(language => {
        return (
          <li key={language}>
            <button
              style={
                language === selected ? { color: "rgb(187, 42, 31)" } : null
              }
              onClick={() => onUpdateLanguage(language)}
              className="btn-clear nav-link"
            >
              {language}{" "}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All"
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(language) {
    this.setState({
      selectedLanguage: language
    });
  }
  render() {
    const { selectedLanguage } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </>
    );
  }
}

export default Popular;
