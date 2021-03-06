import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

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

function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;

        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              {" "}
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255, 191, 116" size={22} />

                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" />
                  {stargazers_count.toLocaleString()} stars
                </li>

                <li>
                  <FaCodeBranch color="rgb(129, 185, 245)" />
                  {forks.toLocaleString()} forks
                </li>

                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

function popularReducer(state, action) {
  if (action.type === "SUCCESS") {
    return {
      ...state,
      [action.selectedLanguage]: action.repos,
      error: null
    };
  } else if (action.type === "ERROR") {
    return {
      ...state,
      error: action.error.message
    };
  } else {
    throw new Error("That action type isn't supported");
  }
}

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("All");
  const [state, dispatch] = React.useReducer(popularReducer, {
    error: null
  });

  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage);
      fetchPopularRepos(selectedLanguage)
        .then(repos => dispatch({ type: "SUCCESS", selectedLanguage, repos }))
        .catch(error => dispatch({ type: "error", error }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching repos" />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </>
  );
}
