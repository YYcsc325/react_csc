import { LOGIN } from '../actions/action';
import { getParams } from '../../serve/method'
/*
* 初始化state
*/
const initState = {
  user: {},
};

/*
* reducer     state为当前的state
*/
export default async function reducer(state = initState, action) {
  const { payload = {} } = action;
  let loginData = await getParams(action.url, payload);
  if(loginData.code === 200){
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          user: loginData.data,     // 替换当前的state
        };
      default:
        return state;
    }
  }
  return loginData;
}