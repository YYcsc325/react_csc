import { connect } from 'react-redux';
import PageView from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中

const add = ( payload = {} ) => {
  return {
    type: 'INCREMENT',
    payload
  }
}
const remove = ( payload = {} ) => {
  return {
    type: 'DECREMENT',
    payload
  }
}
const reset = ( payload = {} ) => {
  return {
    type: 'RESET',
    payload
  }
}
const mapStateToProps = (state, props) => {
  return {
    count: state.counter.count
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    addClick(){
      dispatch(add())
    },
    removeClick(){
      dispatch(remove())
    },
    resetClick(){
      dispatch(reset())
    }
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageView);