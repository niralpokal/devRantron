import React from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainRoutes from './main';
import AuthRoutes from './auth';

const Routes = ({ auth, theme }) => (
  <Router>
    <div>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        { auth.user || auth.noLogin ? <MainRoutes theme={theme} auth={auth} /> : null }
        { !auth.user && !auth.noLogin ? <AuthRoutes /> : null }
      </CSSTransitionGroup>
    </div>
  </Router>
);

MainRoutes.propTypes = {
  theme: PropTypes.object.isRequired,
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  theme: state.settings.theme,
});


export default connect(mapStateToProps, null)(Routes);
