

# Github Issue Reporter

Application is live here: <https://issue-reporter.herokuapp.com/>

The application takes URL of any public Github repository as input and lists the following:

 1. Number of open issues
 2. Number of issues opened in last 24 hours
 3. Number of issues opened in last week (not including those of last 24 hours)
 4. Number of issues opened earlier


### Overview
1. UI takes URL of Github Repository
2. Calls Github API to get details of repo and thereby total open issues count
3. Calls Github API to get issues in paginated way (as per API design)
4. Displays the results on page

### Technologies
  - React.js
  - Bootstrap

### Running the App locally

The applicaion requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ npm install
$ npm start
```

### Application
- Example Repository URL: https://github.com/jlevy/the-art-of-command-line
- Takes the user name and repository name from repository URL and call APIs using them
- Calls to APIs require registered client_id and client_secret
- The UI is responsive (e.g: adjusts page layout appropriately to mobile layout)
- Lists down the different counts of issues w.r.t time as mentioned earier.

### Github API
- https://api.github.com/repos/{user}/{repo}
		- Returns the information about the repository
		- It contains the property 'open_issues_count'
		- The count includes pull_requests along with the issues
- https://api.github.com/repos/{user}/{repo}/issues
		- The API's per_page default param equals 30 (observed)
		- The API can be called with per_page param to fetch extra records, maximum is 100 (observed)
		- If there are more than 100 issues, the API has to be called multiple times changing the per_page query param
		- The results include pull_requests as well. So, those have to be filtered out.
		- A record fetched can be decided as a pull_request and not an issue if it has a property pull_request

### React.js
###### Overview
- All functional components
- Used state hook

###### Application
- App component
	1. Renders Header component, markup for content, Results component with state and isLoading as props
	2. Uses state hook for input query, isLoading and data
	3. On search, fetch results from APIs and set the state which is passed down as props

- Header component
	1. Presentational component to render the header of the page
	2. Just displays the application name in short

- Results component
	1. Takes in isLoading and data as props
	2. If isLoading is true, display loading image
	3. Else, based on the staus property of data, display either a message or the details


### Bootstrap
- Used bootstrap grid layout for responsiveness


### Future scope
- While fetching results, instead of simply showing the loading indicator, it can be shown as progress based on how many pagination calls are finished
- Display the user details (name, photo, profile url, etc) and repository details
- List down the issues and their details(name, tags, created_at, etc.)
