import { connect } from 'react-redux';
import PageView from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中

const mapStateToProps = (state, props) => {
  const { menuCheck: { data } } = state.silder;
  return {
    menuCheck: data || []
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);