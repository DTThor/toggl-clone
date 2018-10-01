import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { cloneDeep, findIndex } from 'lodash';
import Admin from './Admin';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Route, { isAdmin } from './AuthRoute';
import Navbar from './Navbar';
import Login from './Login';
import NotFound from './NotFound';
import RestrictedComponent from './RestrictedComponent';
import {
  getUser,
  setUser,
  setGithubUser,
  removeUser,
  userIsValidated,
  getToken,
  getUserIdFromLocalStorage,
} from '../../utils/userUtils';
import {
  createTimeEntry,
  getRecordFromLocalStorage,
  getTimeStartFromLocalStorage,
  postTimeEntry,
  removeRecordFromLocalStorage,
  removeTimeStartFromLocalStorage,
  setRecordInLocalStorage,
  setTimeStartInLocalStorage,
} from '../../utils/timeEntryUtils';
import { createTimestamp, displayTimeElapsed } from '../../utils/timeUtils';
import { showAlert } from '../../utils/alertUtils';
import { PROJECT_WARNING } from '../../constants';
import * as actionCreators from '../actions/actionCreators';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billable: false,
      categoriesOpen: false,
      categoriesSelected: [],
      currentUser: getUser(),
      task: '',
      inTimerMode: true,
      isLoggedIn: userIsValidated(),
      projectSelected: '',
      projectsOpen: false,
      duration: null,
    };

    this.billableClick = this.billableClick.bind(this);
    this.setCategories = this.setCategories.bind(this);
    this.handleManualSubmit = this.handleManualSubmit.bind(this);
    this.setTask = this.setTask.bind(this);
    this.handleTimerClick = this.handleTimerClick.bind(this);
    this.handleTimerMode = this.handleTimerMode.bind(this);
    this.login = this.login.bind(this);
    this.githubLogin = this.githubLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.setProject = this.setProject.bind(this);
    this.toggleCategoriesList = this.toggleCategoriesList.bind(this);
    this.toggleProjectsList = this.toggleProjectsList.bind(this);
    this.removeManualEntries = this.removeManualEntries.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      this.props.fetchProjects();
      this.props.receiveCategories();
      const user = getUserIdFromLocalStorage();
      this.props.fetchEntries(user);
      this.loadRecordFromLocalStorage();
      this.startClock(getTimeStartFromLocalStorage());
    }
  }

  loadRecordFromLocalStorage() {
    const record = getRecordFromLocalStorage();
    if (record) {
      const { task, project, categories } = record;
      this.setState({ task, projectSelected: project, categoriesSelected: categories });
    }
  }

  login(user) {
    getToken();
    setUser(user);
    const currentUser = user;
    this.setState({ isLoggedIn: true, currentUser });
    this.props.fetchEntries(user._id);
    this.props.receiveCategories();
    this.props.fetchProjects();
  }

  githubLogin(user) {
    setGithubUser(user);
    this.setState({ isLoggedIn: true, currentUser: user });
    this.props.fetchProjects();
    this.props.receiveCategories();
    this.props.fetchEntries(user._id);
  }

  logout() {
    removeUser();
    this.resetAppState();
    this.setState({ isLoggedIn: false });
  }

  setTask(e) {
    this.setState({ task: e.target.value });
  }

  billableClick() {
    this.setState(prevState => ({ billable: !prevState.billable, categoriesOpen: false }));
  }

  toggleProjectsList() {
    this.setState(prevState => ({
      projectsOpen: !prevState.projectsOpen,
    }));
  }

  setProject(id) {
    const { projectSelected } = this.state;
    this.setState({ projectSelected: id === projectSelected ? '' : id });
  }

  toggleCategoriesList() {
    this.setState(prevState => ({
      categoriesOpen: !prevState.categoriesOpen,
    }));
  }

  setCategories(category) {
    const { categoriesSelected } = this.state;
    const categoriesClone = cloneDeep(categoriesSelected);
    const indexOfCategorySelected = findIndex(categoriesClone, { _id: category._id });
    if (indexOfCategorySelected === -1) {
      categoriesClone.push(category);
    } else {
      categoriesClone.splice(indexOfCategorySelected, 1);
    }
    this.setState({ categoriesSelected: categoriesClone });
  }

  createRecord() {
    const {
      billable, categoriesSelected, projectSelected, task,
    } = this.state;

    return {
      billable,
      categories: categoriesSelected,
      project: projectSelected,
      task,
    };
  }

  startClock(timeStart) {
    if (timeStart) {
      this.timer = setInterval(() => {
        const timeNow = createTimestamp();
        const newDuration = displayTimeElapsed(timeStart, timeNow);
        this.setState({ duration: newDuration });
      }, 1000);
    }
  }

  stopClock() {
    clearInterval(this.timer);
  }

  async handleTimerClick() {
    const { projectSelected } = this.state;
    const timeStartInLocalStorage = getTimeStartFromLocalStorage();

    if (!timeStartInLocalStorage) {
      const timeStart = createTimestamp();
      setTimeStartInLocalStorage(timeStart);
      setRecordInLocalStorage(this.createRecord());
      this.startClock(timeStart);
    } else {
      if (!projectSelected) return showAlert(PROJECT_WARNING);
      this.stopClock();
      const userId = getUserIdFromLocalStorage();
      const timeStart = getTimeStartFromLocalStorage();
      const timeEnd = createTimestamp();
      const record = this.createRecord();
      const timeEntry = createTimeEntry(userId, timeStart, timeEnd, record);
      await postTimeEntry(timeEntry);
      removeTimeStartFromLocalStorage();
      removeRecordFromLocalStorage();
      this.resetAppState();
      this.props.fetchEntries(userId);
    }
  }

  async handleManualSubmit(timeStart, timeEnd) {
    const { projectSelected } = this.state;
    if (!projectSelected) return showAlert(PROJECT_WARNING);
    const userId = getUserIdFromLocalStorage();
    const record = this.createRecord();
    const timeEntry = createTimeEntry(userId, timeStart, timeEnd, record);
    await postTimeEntry(timeEntry);
    removeRecordFromLocalStorage();
    this.removeManualEntries();
    this.resetAppState();
    this.props.fetchEntries(userId);
  }

  removeManualEntries() {
    localStorage.removeItem('manualTimeEnd');
    localStorage.removeItem('manualTimeStart');
  }

  handleTimerMode() {
    const { duration } = this.state;
    if (!duration) {
      this.setState(prevState => ({ inTimerMode: !prevState.inTimerMode }));
    }
  }

  resetAppState() {
    this.setState({
      billable: false,
      categoriesOpen: false,
      categoriesSelected: [],
      duration: null,
      projectSelected: '',
      projectsOpen: false,
      task: '',
    });
  }

  render() {
    const {
      billable,
      categoriesOpen,
      categoriesSelected,
      currentUser,
      duration,
      inTimerMode,
      isLoggedIn,
      projectSelected,
      projectsOpen,
      task,
    } = this.state;

    return (
      <Router>
        <div>
          <Alert stack={{ limit: 2 }} />
          <Navbar isLoggedIn={isLoggedIn} user={currentUser} logout={this.logout} />
          <Switch>
            <Route exact path="/" component={Landing} isPrivate={false} />
            <Route
              path="/login"
              component={() => <Login login={this.login} githubLogin={this.githubLogin} />}
              isPrivate={false}
            />
            <Route
              path="/admin"
              component={() => (
                <RestrictedComponent isAdmin={isAdmin()}>
                  <Admin />
                </RestrictedComponent>
              )}
              isPrivate
            />
            <Route
              path="/dashboard"
              component={() => (
                <Dashboard
                  billable={billable}
                  billableClick={this.billableClick}
                  categoriesOpen={categoriesOpen}
                  categoriesSelected={categoriesSelected}
                  handleManualSubmit={this.handleManualSubmit}
                  handleTimerClick={this.handleTimerClick}
                  handleTimerMode={this.handleTimerMode}
                  inTimerMode={inTimerMode}
                  projectSelected={projectSelected}
                  projectsOpen={projectsOpen}
                  setCategories={this.setCategories}
                  setProject={this.setProject}
                  setTask={this.setTask}
                  task={task}
                  duration={duration}
                  toggleCategoriesList={this.toggleCategoriesList}
                  toggleProjectsList={this.toggleProjectsList}
                />
              )}
              isPrivate
            />
            <Route path="*" component={NotFound} isPrivate={false} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  receiveCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    projects: state.projects.projects,
    categories: state.categories,
    timeEntries: state.timeEntries.timeEntries,
  }
);

const mapDispachToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);


export default connect(mapStateToProps, mapDispachToProps)(App);
