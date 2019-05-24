# Github Issue Reporter

Application is live here: <https://issue-reporter.herokuapp.com/>

The application takes URL of any public Github repository as input and lists the following:
    1. Number of open issues
    2. Number of issues opened in last 24 hours
    3. Number of issues opened in last week (not including those of last 24 hours)
    4. Number of issues opened earlier

### Overview
1. UI takes URL of Github Repository
2. Calls the Github API with registered client_id and client_secret
3. Displays the results on page

### Technologies
  - React.js
  - Bootstrap

### Running the App locally

The applicaion requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm start
```

### Application
- Example Repository URL: https://github.com/jlevy/the-art-of-command-line
- Takes the user name and repository name from repository URL and call API using them
- The UI is responsive (e.g: adjusts page layout appropriately to mobile layout)
- Lists down the different counts of issues w.r.t time as mentioned earier.

### Github API
- https://api.github.com/repos/{user}/{repo}/issues?client_id={client_id}&client_secret={client_secret}

### React.js
###### Overview
- All functional components
- Used state hook

###### Application
- App component
        - Renders Header component, markup for content, Results component with state and isLoading as props
        - Uses state hook for input query, isLoading and data
        - On search, fetch results from API and set the state which is passed down as props
- Header component
        - Presentational component to render the header of the page
        - Just displays the application name in short
- Results component
        - Takes in isLoading and data as props
        - If isLoading is true, display loading image
        - Else, based on the staus property of data, display either a message or the deatails with counts


### Bootstrap
- Used bootstrap grid layout for responsiveness


### Future scope
- Display the user details (name, photo, profile url, etc.) along with the issues
- List down the issues(name, tags, created_at, etc.) along with the count
