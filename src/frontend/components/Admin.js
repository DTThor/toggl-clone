import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from 'react-super-modal';
import axios from 'axios';
import Alert from 'react-s-alert';
import { findIndex } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { removeProject, updateNotification, deleteNotification, createNotification } from '../../utils/projectUtils';
import { ERROR_STRING } from '../../constants';
import * as actionCreators from '../actions/actionCreators';


const { API_URL } = process.env;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteMode: false,
      isEditMode: false,
      isError: false,
      isModalOpen: false,
      projectId: '',
      projectName: '',
      projectClient: '',
    };
    this.deleteProject = this.deleteProject.bind(this);
    this.getDisabledStatus = this.getDisabledStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProjectEdit = this.handleProjectEdit.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.postProject = this.postProject.bind(this);
    this.showModal = this.showModal.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }

  getDisabledStatus() {
    const { projectClient, projectName } = this.state;
    return projectClient.length === 0 || projectName.length === 0;
  }
  showModal() {
    this.setState({ isModalOpen: true });
  }
  hideModal() {
    this.setState({
      isDeleteMode: false,
      isEditMode: false,
      isError: false,
      isModalOpen: false,
      projectName: '',
      projectClient: '',
    });
  }
  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async postProject(e) {
    e.preventDefault();
    const { projectClient, projectName } = this.state;
    const { projects, fetchProjects } = this.props;
    try {
      const newProject = await axios.post(`${API_URL}/projects`, { client: projectClient, name: projectName });
      const updatedProjects = projects.concat(newProject.data);
      createNotification();
      return fetchProjects(updatedProjects);
    } catch (err) {
      this.setState({ isError: true });
    }
  }

  async updateProject(e) {
    e.preventDefault();
    const { projectId, projectClient, projectName } = this.state;
    const { projects, fetchProjects } = this.props;
    try {
      const updatedProject = await axios.put(`${API_URL}/projects/${projectId}`, { client: projectClient, name: projectName });
      const projectIndex = findIndex(projects, { _id: projectId });
      const updatedProjects = projects.splice(0);
      updatedProjects[projectIndex] = updatedProject.data;
      updateNotification();
      return fetchProjects(updatedProjects);
    } catch (err) {
      this.setState({ isError: true });
    }
    this.setState({ isModalOpen: false });
  }

  async deleteProject(e) {
    e.preventDefault();
    const { projectId } = this.state;
    const { projects, fetchProjects } = this.props;
    try {
      await removeProject(projectId);
      const filteredProjects = projects.filter(project => project._id !== projectId);
      fetchProjects(filteredProjects);
      this.hideModal();
      return deleteNotification();
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  handleProjectEdit(projectId, projectClient, projectName) {
    this.showModal();
    this.setState({
      isEditMode: true,
      projectClient,
      projectId,
      projectName,
    });
  }

  handleProjectDelete(projectId, projectName) {
    this.showModal();
    this.setState({
      isDeleteMode: true,
      projectId,
      projectName,
    });
  }

  render() {
    const {
      isDeleteMode,
      isEditMode,
      isError,
      isModalOpen,
      projectClient,
      projectName,
    } = this.state;
    const { projects } = this.props;
    return (
      <div className="tc measure center ph2 lh-copy">
        <h1 className="mb0 fw9 dib tracked-tight mooveItNavy">ADMIN PORTAL</h1>
        <Link className="fw9 tracked-tight mooveItNavy" to="/dashboard">
          <p className="mt0 mb4">Take me to dashboard</p>
        </Link>
        <h2>
          Current Projects{' '}
          <FontAwesomeIcon
            className="tl mooveItNavy pointer"
            icon={faPlusCircle}
            size="1x"
            onClick={this.showModal}
          />
        </h2>
        <Modal isOpen={isModalOpen} onClose={this.hideModal}>
          {isDeleteMode ? (
            <div className="tc measure center">
              <p className="mooveItNavy">
                {isError ? ERROR_STRING : `Are you sure you want to delete "${projectName}"?`}
              </p>
              {isError ? (
                <button
                  className="f6 mb2 mh2 ph3 pv2 outline-0 input-reset dib bg-transparent ba mooveItTealBorder white mooveItNavybg pointer"
                  onClick={this.hideModal}
                >
                  OK
                </button>
              ) : (
                <button
                  className="f6 mb2 mh2 ph3 pv2 outline-0 input-reset dib bg-transparent ba mooveItTealBorder white mooveItNavybg pointer"
                  onClick={this.deleteProject}
                >
                  Yes
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={isEditMode ? this.updateProject : this.postProject}>
              <fieldset className="ba b--transparent ph0 mh0">
                <legend className="pt2 mooveItTeal f5 fw6 ph0 mh3 tl">
                  {isEditMode ? 'Edit Project' : 'New Project'}
                </legend>
                <div className="mv3">
                  <label className="mooveItTeal db fw6 lh-copy f6 tl mh3" htmlFor="projectClient">
                    Client
                    <input
                      className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                      value={projectClient}
                      onChange={this.handleChange}
                      type="text"
                      name="projectClient"
                      autoComplete="off"
                    />
                  </label>
                </div>
                <div>
                  <label className="mooveItTeal db fw6 lh-copy f6 tl mh3" htmlFor="projectName">
                    Project Name
                    <input
                      className="pa2 outline-0 mooveItTealBorder input-reset ba bg-transparent w-100"
                      value={projectName}
                      onChange={this.handleChange}
                      type="text"
                      name="projectName"
                      autoComplete="off"
                    />
                  </label>
                </div>
              </fieldset>
              <div>
                <input
                  className={`f6 mh3 mb2 ph3 pv2 outline-0 input-reset dib bg-transparent ba b--moon-gray bg-white moon-gray ${!this.getDisabledStatus() &&
                    'mooveItNavybg mooveItTeal pointer'}`}
                  type="submit"
                  value="Submit"
                  disabled={this.getDisabledStatus()}
                />
              </div>
            </form>
          )}
        </Modal>
        {projects.map(project => (
          <p className="tl" key={project._id}>
            {project.client} -- {project.name}{' '}
            <FontAwesomeIcon
              className="mooveItNavy pointer ml3"
              onClick={() => this.handleProjectEdit(project._id, project.client, project.name)}
              icon={faEdit}
              size="1x"
            />{' '}
            <FontAwesomeIcon
              className="mooveItPink pointer"
              onClick={() => this.handleProjectDelete(project._id, project.name)}
              icon={faTrashAlt}
              size="1x"
            />
          </p>
        ))}
        <Alert stack={{ limit: 2 }} />
      </div>
    );
  }
}

Admin.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  fetchProjects: PropTypes.func.isRequired,
};

Admin.defaultProps = {
  projects: [],
};

const mapStateToProps = state => (
  { projects: state.projects.projects }
);

const mapDispachToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);


export default connect(mapStateToProps, mapDispachToProps)(Admin);
