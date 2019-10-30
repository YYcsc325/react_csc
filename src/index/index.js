// require('./css/style.css');
// require('./css/style.less');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getRouter from './router/router';
import store from './redux/store';             // 让所有组件都能用store
// 1.Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
// 2.connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
const router = getRouter();


  ReactDOM.render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('root')
  );
// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}