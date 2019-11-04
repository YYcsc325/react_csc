import { CHECKEDLINK } from '../actions/action';

/*
* 初始化state
*/
const initState = {
  menuCheck: {
    data: ['用户管理', '用户列表']   // 应该从原始数据中去获取
  },
};

/*
* reducer     state为当前的state
*/
export default function reducer(state = initState, action) {
  const { payload } = action;
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