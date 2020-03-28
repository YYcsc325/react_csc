import { LOGIN } from '../actions/action';
import { getIn } from '~utils/indexAll.js' 
/*
* 初始化state
*/
const initState = {
  userLogin: false,
};

/*
* reducer     state为当前的state
*/
export default function reducer(state = initState, action) {
  const { payload } = action;
  // console.log(getIn(payload, ['type'], ''))
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userLogin: payload.login,     // 替换当前的state
      };
    default:
      return state;
  }
}