import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tabItem } from '../../actions/nav';
import { resetPage, fetch } from '../../actions/rants';

class TopNav extends Component {
  // constructor(props) {
  //   super(props);
    // this.state = {
    //   activeItem: '',
    // };
  // }

  onClickTabItem(type) {
    this.props.updateItem(type);
    this.props.resetPage();
    this.props.fetch(
      type,
      25,
      25 * this.props.rants.page,
      this.props.authToken,
    );
    // this.props.fetch(type);
    // this.setState({ activeItem: type });
  }

  render() {
    return (
      <div className="top_nav">
        <div className="top_nav_container" id="top_nav_container" >
          {
          this.props.items.map((item) => {
            let activeStyle = '';
            if (this.props.selectedItem === item) {
              activeStyle = '1px solid white';
            }
            return (
              <button
                className="btn"
                onClick={() => this.onClickTabItem(item)}
                key={item}
                style={{ borderBottom: activeStyle }}
              >
                {item}
              </button>
            );
          })
        }
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  fetch: React.PropTypes.func.isRequired,
  items: React.PropTypes.array,
};

TopNav.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => ({
  items: state.topNav.items,
  selectedItem: state.topNav.selectedItem,
  authToken: state.auth.authToken,
  rants: state.rants,
});

const mapDispatchToProps = (dispatch) => ({
  updateItem: (i) => dispatch(tabItem(i)),
  resetPage: () => resetPage()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
