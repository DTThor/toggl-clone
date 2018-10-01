import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const timingOnIcon = '../static/favicon-timing.ico';
const timingOffIcon = '../static/favicon-not-timing.ico';

export default class DocumentHead extends Component {
  render() {
    const { duration } = this.props;
    return (
      <Helmet defer={false}>
        <title>{duration ? `${duration} ∙ Minutero` : 'Minutero'}</title>
        <link
          rel="icon"
          href={duration ? timingOnIcon : timingOffIcon}
          sizes="16x16"
          type="image/ico"
        />
      </Helmet>
    );
  }
}

DocumentHead.propTypes = {
  duration: PropTypes.string,
};

DocumentHead.defaultProps = {
  duration: null,
};
