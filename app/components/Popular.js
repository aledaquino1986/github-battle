import React, { Component } from "react";

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
    const languages = ["All", "Javascript", "Ruby", "CSS", "Python", "Java"];
    return (
      <ul className="flex-center">
        {languages.map(language => {
          return (
            <li key={language}>
              <button
                style={
                  language === this.state.selectedLanguage
                    ? { color: "rgb(187, 42, 31" }
                    : null
                }
                onClick={() => this.updateLanguage(language)}
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
}

export default Popular;
