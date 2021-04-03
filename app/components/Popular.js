import React, { Component } from "react";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "CSS", "Python", "Java"];
  return (
    <ul className="flex-center">
      {languages.map(language => {
        return (
          <li key={language}>
            <button
              style={
                language === { selected } ? { color: "rgb(187, 42, 31" } : null
              }
              onClick={() => onUpdateLanguage(langugage)}
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
    const { selectedLangugae } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLangugae}
          onUpdateLanguage={this.updateLanguage}
        />
      </>
    );
  }
}

export default Popular;
