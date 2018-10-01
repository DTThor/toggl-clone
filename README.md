# Toggl Clone

## To Run This Project Locally

• `git clone` into this repo

• `npm install`

• `mongod` to start up the Mongo daemon

• `mongo` in a separate terminal tab to start the instance of Mongo

• `npm run server:local` in yet another terminal tab to spin up your local server

• `npm run webpack:dev` in one last terminal tab to spin up your webpack server (serves on `localhost:8080`)

• set up your `.env` variables using the `.env.default` file as a guide

## Sprint Workflow

• Sprints are one week long

• Iteration planning takes place on **Tuesday** mornings

• Retrospectives take place on **Mondays** at the end of the day

• Demos for the client take place on **Fridays**

• The client will create the user stories

• The team leader will keep Jira up to date

• The Dev Team members will use Post-it notes to show each other what you are working on

## Git Workflow

Feature branches should match the Jira ticket along with a keyword(s) describing the purpose

```
AT-6-login
```

### Before Making a Pull Request

Pull down latest changes and fix any merge conflicts.
(E.g. from feature branch):

```
$ git pull --rebase origin master
```

Make sure code passes tests

```
$ npm test
```

Make sure code passes linter

```
$ npm run lint
```

Squash all related commits locally.
(E.g. if on feature branch, to squash last 4 commits):

```
$ git rebase -i HEAD~4
```

Push to your feature branch

```
$ git push origin AT-6-login
```

### When Making a Pull Request

Provide a **title** which matches the feature branch name.

```
AT-6-login
```

Provide **comments** which _briefly_ explain the purpose of the pull request.

```
Enable login functionality
Refactor utility function sessionLogin
```

### After Making a Pull Request

Notify team by posting link in Slack with a mention to everyone.

```
https://github.com/moove-it/apprenticeship-toggle/pull/13 @here
```

Respond to reviewer comments on Github. For more in depth discussions use Slack.
```
You: Hey, I have a question about one of your comments
Them: Great
You: Great!
```

### Reviewing a Pull Request

If your pull request is being reviewed, it's nice when they let you know in the Slack channel.

```
Them: 👀☝️
You: Great!
Them: Stop it
```

### Before Merging a Pull Request

• There should be at least two approvals, one of them from a full-time dev.

• All reviewers must approve.

### To Merge a Pull Request

• Use the **Squash and Merge** option for merging smaller prs that have some revision commits.

• Use the **Rebase and Merge** option for merging smaller prs going into a feature branch.

• Use the **Merge** option for merging feature branches into dev or dev into master

• After merging, **Delete Branch** using the Github button.

## How Time Entries Happen
A time entry consists of:

• a task

• a project

• any number of category tags

• whether or not the task is billable

• a start time/date

• an end time/date


How the start and end times/dates are recorded depend on whether you are in timer mode or manual entry mode

### Time Entries Made in Timer Mode
By default the app is in timer mode.

The user sees a running clock set to zeros and a timer button.


#### Start Button
When the user first clicks the timer button the following happens:

• the current time/date (start time) is captured and set in local storage

• a record (task, project, categories, billable) is captured from state and set in local storage as backup

• isTiming is changed to true

#### Stop Button

When the user clicks the timer button a second time the following happens:

• an alert is shown if a project has not been selected

• the start time is retrieved from local storage

• the stop time is captured

• a record (task, project, categories, billable) is captured from state, or if a browser refresh occurred while timing the app uses the local storage backup

• a complete time entry (start time, end time, and record) is created and a POST request is made to the server

• the start time and record in local storage is cleared

• the app state is reset and isTiming becomes false again (so long as there isn't a start time in local storage)

• a GET request is made to the server to get the latest time entries


### Time Entries Made Using Manual Entry

The user has the option to switch to manual entry mode by clicking an icon.

Instead of a timer button and clock, the user is shown a calendar, and inputs for start and end times.

#### Calendar

The calendar by default shows the current date but the user can change it.

#### Time Inputs

The user must input valid start and end times.

#### Submit Button

In order to submit an entry a project must be selected, and start and end times must be preset and valid

When the user is able to submit the following happens:

• an alert is shown if a project has not been selected

• The calendar date and start time are combined into a single start time/date.

• a complete time entry (start time, end time, and record) is created and a POST request is made to the server

• the app state is reset and isTiming becomes false again

• a GET request is made to the server to get the latest time entries

## How the Times Work

The Moment.js library is used to create time/date objects and turn them into ISO strings to be stored.

When the times need to be rendered in the browser Moment.js is used to format them into readable formats.


## How the Timer Works

When isTiming becomes true the clock will start and the following happens:

• The start time (which was recently set in local storage) is retrieved

• A timer fires every 1 second and a utility function calculates the elapsed time (start time to current time)

• The elapsed time is updated in state and re rendered every second

• A library called react-helmet shows the elapsed time in the document header as well

• A refresh should not affect the timer

## Mongoose Conventions

Mongoose models will be in their own directory.  Their schemas will be defined there as well.

Variable names will follow this convention:

```
/* user.js */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  token: String,
});

module.exports = mongoose.model('User', schema);

```

Note the following:

• The file is lowercase singular

• Schema is destructured from the mongoose module

• The schema is instantiated using the _new_ keyword

• Schemas can referenced in other models using ref so they don't have to be passed

• If a field only contains the type, do not use object syntax, i.e.

```
name: String
```
not
```
name: {
  type: String
}
```

• Export the model without having to name it

• The model name (first argument) is uppercase singular (see mongoose docs for more re this)
