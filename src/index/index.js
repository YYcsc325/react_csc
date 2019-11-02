import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';             // 让所有组件都能用store
import zhCN from 'antd/es/locale/zh_CN';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import App from './container/App';
import loadComponent from './router/loadable';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
//全局路由跳转对象
window.appHistory = history;

//登录页面
const Login = loadComponent(() => import('./container/login/index'));

const ProvideRoute = ({component: Component, ...rest}) => {
  return <Route
          {...rest}
          render = {props => {
              return Store.getState().login.userLogin ?  <Component {...props}/> : <Redirect to={{pathname: '/login'}}/>          
          }}
      />
}

const Index = () => {
  return <Provider store={Store}>
      <Router history={history}>
          <Switch>
              <Route path='/login' component={Login}/>
              <ProvideRoute path='/' component={App}/>
          </Switch>
      </Router>
  </Provider>
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}