import { connect } from 'react-redux';
import { increment, decrement, reset } from '../../redux/actions/couter';
import Counter from './view'
// state为全局的state，return 出的这个对象会跟当前的this.prop进行合并，注入到当前props中
const mapStateToProps = (state) => {
  console.log(state, 'state')
  return {
    counter: state.counter.count,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
      increment: () => {
        dispatch(increment());
      },
      decrement: () => {
        dispatch(decrement());
      },
      reset: () => {
        dispatch(reset());
      },
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Counter);