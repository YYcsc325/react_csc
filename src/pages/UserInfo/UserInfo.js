import { connect } from 'react-redux';
import { getUserInfo } from '../../redux/actions/userInfo';
import PageView from './view'
const mapStateToProps = (state, props) => {
  return {
    userInfo: state.userInfo
  };
};
const mapDispatchToProps = (dispatch, props) => {
    return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);