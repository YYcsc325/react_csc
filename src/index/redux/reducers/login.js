import { LOGIN } from '../actions/action';

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