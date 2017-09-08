import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from './Loading'

var api = require('../utils/api')

// ................................
// this is a Stateless Functional Component

function SelectLanguage (props) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Python', 'Java', 'CSS']

    return (
    <ul className="languages">
      {languages.map(function (lang) {
        {
          return (
            <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null }
            key={lang}
            onClick={props.onSelect.bind(null,lang)}>
            {lang}
            </li>
          )
        } }
      )
    }
    </ul>
  )
  }

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

// ...............................

function RepoGrid (props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function (repo, index) {
        return (
        <li key={repo.name} className="popular-item">
            <div className="popular-rank">
              #{index +1}
            </div>
            <ul className="space-list-items">
                <li>
                  <img
                    className="avatar"
                    src={repo.owner.avatar_url}
                    alt={"Avatar for " + repo.owner.login}
                  />
                </li>
                <li>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
                <li>
                  @{repo.owner.login}
                </li>
                <li>
                  {repo.stargazers_count} stars
                </li>
            </ul>
        </li>
      )})}
    </ul>

  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

// ...............................

export class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.updateLanguage = this.updateLanguage.bind(this)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null
    })

    api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState( {
        repos: repos
      } )
    } )
  }

  render() {
    return (
      <div>
      <SelectLanguage
      selectedLanguage={this.state.selectedLanguage}
      onSelect={this.updateLanguage}
      />
      {!this.state.repos ? <Loading /> :
        <RepoGrid
          repos={this.state.repos}
        /> }
      </div>
    )
  }
}
