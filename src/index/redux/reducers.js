/**
 * @name reducer就是纯函数，接收state 和 action，然后返回一个新的 state
 * @param { state , action } 
 */
import { combineReducers } from 'redux';
import counter from './reducers/couter';
import userInfo from './reducers/userInfo';
import login from './reducers/login'
// export default function combineReducers( state = {}, action ) {
//     return {
//         counter: counter( state.counter, action ),
//         userInfo: userInfo(state.userInfo, action)
//     }
// }
export default combineReducers({
    counter,
    userInfo,
    login
})