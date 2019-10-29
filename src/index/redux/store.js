/*
  提供 getState() 方法获取 state;
  提供 dispatch(action) 触发reducers方法更新 state;
  通过subscribe(listener) 注册监听器;
  通过 subscribe(listener) 返回的函数注销监听器;
*/
import { createStore , applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers.js';

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));
export default store;