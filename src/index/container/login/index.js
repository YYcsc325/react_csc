import { connect } from 'react-redux';
import PageView from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中
const login = ( payload = {} ) => {
  return {
    type: 'LOGIN',
    payload
  }
}
const mapStateToProps = (state, props) => {
  const { login: { userLogin } } = state;
  return {
    userLogin
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    login(value){
      dispatch(login(value))
    }
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);