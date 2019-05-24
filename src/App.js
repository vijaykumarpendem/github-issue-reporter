import React, {Fragment, useState} from 'react';
import Results from './components/Results';
import './App.css';
import config from './config';

/**
* Header Component - To display the page header
*/
const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container">
        <a href="/" className="navbar-brand">Issues Report</a>
      </div>
    </nav>
  );
}

/**
* Results Component - Main Component
*/
const App = () => {
  // Placeholder for search query
  const [repoUrlQuery, setRepoUrlQuery] = useState('');

  const defaultState = {
    repositoryName: '',
    totalCount: null,
    lastDayCount: null,
    lastWeekCount: null,
    earlierCount: null,
    status: 'PRISTINE'
  };
  const [state, setState] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);


  /**
  * Event handler -  On change of repo url input
  * Updates the value of input
  * param: object - event : change event of input
  */
  const onRepoUrlUpdate = (e) => {
    setRepoUrlQuery(e.target.value);
  };

  /**
  * Event handler -  On click of search
  * Calls the github api with the repoUrlQuery
  * Calls setDetails on success
  * Sets state with status as Error in case of error
  */
  const onRepoSearch = async () => {
    setIsLoading(true);
    const repoUrlInfo = repoUrlQuery.split('/').reverse();
    const repoName = repoUrlInfo[0];
    const userName = repoUrlInfo[1];
    let issuesUrl = `https://api.github.com/repos/${userName}/${repoName}/issues?client_id=${config.clientId}&client_secret=${config.clientSecret}`;
    try {
      const response = await fetch(issuesUrl);
      const data = await response.json();
      if(data.message === "Not Found") {
        setState({...state, status: 'INVALID_REPO'});
      } else {
        setDetails(data);
      }
    } catch(e) {
      setState({...state, status: 'ERROR'});
    } finally {
      setIsLoading(false);
    }
  };

  /**
  * Internal Method -  To set details
  * param: object - issues : array of issues
  * Sets state with status as Error in case of error
  */
  const setDetails = issues => {
    const totalCount = issues.length;
    const repositoryName = repoUrlQuery.split('/').reverse()[0];
    let lastDayCount = 0;
    let lastWeekCount = 0;
    let earlierCount = 0;
    const hourMilliseconds = 1000 * 60 * 60;
    let createdTime, presentTime, hoursDifference;
    issues.forEach(issue => {
      createdTime = new Date(issue.created_at);
      presentTime = new Date();
      hoursDifference = (presentTime-createdTime)/hourMilliseconds;
      if(hoursDifference<24) {
        lastDayCount++;
      } else if(hoursDifference<168) {
        lastWeekCount++;
      } else {
        earlierCount++;
      }
    });
    setState({
      repositoryName,
      totalCount,
      lastDayCount,
      lastWeekCount,
      earlierCount,
      status: 'VALID_REPO'
    });
  }

  return (
    <Fragment>
      <Header/>
      <div className="container searchContainer">
        <div className="card card-body text-center">
          <h1>Github Issues Report</h1>
          <p className="lead">Enter the url of repository</p>
          <div className="row">
            <div className="col-md-6 offset-md-2">
              <input type="text" className="form-control mb-2" onChange={onRepoUrlUpdate} placeholder="e.g: https://github.com/jlevy/the-art-of-command-line"/>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={onRepoSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <Results data={state} isLoading={isLoading}/>
    </Fragment>
  )
}

export default App;
