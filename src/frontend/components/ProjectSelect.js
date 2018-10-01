import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCheck } from '@fortawesome/free-solid-svg-icons';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';

class ProjectSelect extends Component {
  render() {
    const {
      projects, projectSelected, projectsOpen, setProject, toggleProjectsList,
    } = this.props;

    // marks the item in the list that has been selected so a check mark can be shown
    const projectsRendered = projects.map((item) => {
      const itemCopy = Object.assign({}, item);
      if (itemCopy._id === projectSelected) itemCopy.selected = true;
      return itemCopy;
    });

    // looks up the project by id so its name can be shown
    const projectRendered = find(projects, { _id: projectSelected });

    return (
      <div className="relative">
        <div className="pointer " onClick={toggleProjectsList} role="presentation">
          {projectRendered ? (
            <div className="dib w-auto nowrap ba b--light-silver pa2 br3 black-80">
              {projectRendered.name}
            </div>
          ) : (
            <FontAwesomeIcon className="gray grow-large black-20 mh3" icon={faFolder} size="lg" />
          )}
        </div>

        {projectsOpen ? (
          <ul
            className="dropdown-list list bg-white black-90 ba b--light-silver br3 pb3 pt3 ph0 ma4"
            onMouseLeave={toggleProjectsList}
          >
            {projectsRendered.map(item => (
              <li
                className="listItem ph0 pv2 black-80"
                key={item._id}
                onClick={() => setProject(item._id)}
                role="presentation"
              >
                <div className="ml3 dib w-10">
                  {item.selected && <FontAwesomeIcon icon={faCheck} />}
                </div>
                <div className="pa0 dib">{item.name}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

ProjectSelect.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  projectSelected: PropTypes.string.isRequired,
  projectsOpen: PropTypes.bool.isRequired,
  setProject: PropTypes.func.isRequired,
  toggleProjectsList: PropTypes.func.isRequired,
};

ProjectSelect.defaultProps = {
  projects: [],
};

const mapStateToProps = state => (
  { projects: state.projects.projects }
);

const mapDispachToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);


export default connect(mapStateToProps, mapDispachToProps)(ProjectSelect);
