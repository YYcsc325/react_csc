import { CHECKEDLINK } from '../actions/action';

/*
* 初始化state
*/
const initState = {
  menuCheck: {},
};

/*
* reducer     state为当前的state
*/
export default function reducer(state = initState, action) {
  const { payload } = action;
  console.log(payload, 'payload')
  switch (action.type) {
    case CHECKEDLINK:
      return {
        ...state,
        menuCheck: payload,     // 替换当前的state
      };
    default:
      return state;
  }
}