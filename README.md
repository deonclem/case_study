## Available Scripts

In the project directory, you can run:

### `npm install`

Will install the dependencies

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### Approach and remarks

Time spent: 4.5h

The app is deployed and available here [https://jolly-feynman-3836df.netlify.com](https://jolly-feynman-3836df.netlify.com)

The app Store is divided into 2 pieces of State:

- the People Slice which is used to query the teams and users and will store the returned values
- the Schemes Slice which is used to manipulate the Validation Schemes data and persist/retrieve the values into locale storage

This is what is functionnal in this version:

- A User can see the list of existing teams with the first 3 users being displayed
- Clicking on a Team displays the list of threeshold steps for that team. A Threeshold is made of a From value, a To value and has an approver
- A user can add one or more new steps and save them. It will be persisted to locale storage
- Only a pseudo-valid step can be created (must have a "from", "to" and an approver )
- A user can edit an existing step and save to persist

A list of things that are not supported in this version:

- A user cannot delete an existing step.
- No additionnal checks are made when creating a step to make sure the data is valid ("From" must be smaller than "To", the approver isn't already on another step...)
- The list of approvers aren't displayed on the Homepage
- I didn't have enough time to write more tests to check the application behaviour more deeply

### Misc

- It seems like two teams can have the same ID. Right now both Sales & Operations redirect to Sales
