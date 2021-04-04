import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchPopularRepos } from "../utils/api";

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
      selectedLanguage: "All",
      repos: {},
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(error => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: "There was an error fetching the repositories"
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  }
  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </>
    );
  }
}

export default Popular;
