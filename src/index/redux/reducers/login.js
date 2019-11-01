import { LOGIN } from '../actions/login';

/*
* 初始化state
*/
const initState = {
  login: false,
};

/*
* reducer     state为当前的state
*/
export default function reducer(state = initState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOGIN:
      return {
        login: payload.login,     // 替换当前的state
      };
    default:
      return state;
  }
}