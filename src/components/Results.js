import React, {Fragment} from "react";
import PropTypes from "prop-types"

/**
* Results Component - To display issue counts
*/
const Results = props => {
  // For dynamic template to be rendered
  let output;

  /**
   * Helper method - To get template to show as message
   * param: string - message : message to be displayed
   * return: jsx - template with the message
   */
  const getMessageTemplate = message => {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <h2>{message}</h2>
      </div>
    );
  };

  // Check isLoading and display details accordingly
  if(props.isLoading) {
    output = (
      <div className="d-flex align-items-center justify-content-center h-100">
        <img className="img-fluid loading-image" src="/giphy.gif" alt="Loading..."/>
      </div>
    )
  } else {
    switch(props.data.status) {
      case "VALID_REPO":
        output = (
          <Fragment>
            <h2>Repository: {props.data.repositoryName}</h2>
            <br/>
            <ul className="list-group">
              <li className="list-group-item">Total Open Issues: {props.data.totalCount}</li>
              <li className="list-group-item">Issues opened in last 24hrs: {props.data.lastDayCount}</li>
              <li className="list-group-item">Issues opened in last week: {props.data.lastWeekCount}</li>
              <li className="list-group-item">Issues opened earlier: {props.data.earlierCount}</li>
            </ul>
          </Fragment>
        );
        break;
      case "INVALID_REPO":
        output = getMessageTemplate("That is an invalid repository!");
        break;
      case "PRISTINE":
        output = getMessageTemplate("Search for a repository!");
        break;
      default:
        output = getMessageTemplate("Some error occurred :(");
    }
  }

  return (
    <Fragment>
      <div className="container mt-3">
        <div className="card card-body mb-3 results-card">
          {output}
        </div>
      </div>
    </Fragment>
  )
}

// Specifies the props Results component has to be provided
Results.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
}

export default Results;
