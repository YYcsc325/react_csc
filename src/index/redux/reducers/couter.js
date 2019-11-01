import { INCREMENT, DECREMENT, RESET } from '../actions/couter';

/*
* 初始化state
*/
const initState = {
  count: 0,
};

/*
* reducer     state为当前的state
*/
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,     // 替换当前的state
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    case RESET:
      return { count: 1 };
    default:
      return state;
  }
}