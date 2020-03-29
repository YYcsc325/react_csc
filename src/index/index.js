import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';             // 让所有组件都能用store
// import '@dep/axios'
import zhCN from 'antd/es/locale/zh_CN';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
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
            console.log(Store.getState().login, 'Store')
              return Store.getState().login.user ?  <Component {...props}/> : <Redirect to={{pathname: '/login'}}/>          
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

/**
 * @name Ts
 */

 // 元祖类型
//  let yuanzu : [string, number] = ['123123',1231232];      // 这种写法是定义变量的
//  console.log(yuanzu,'yuanzu')
 
//  // 枚举
//  enum Test {
//      one = 1,    // 属性从1开始
//      two,
//      three,
//      four
//  }
//  console.log(Test,'Test')
 
//  // 泛型  T自动捕获传入的T变量类型，传出也是T这个类型
//  function identity<T>(arg: T[]): T[] {  
//      console.log(arg, 'arg');
//      return arg;
//  }
//  identity([{
//      name: '12314'
//  }])
//  interface Person {       // 至少传这两个  interface是定义接口的
//      firstName: string;   
//      lastName: boolean;
//  }
//  // Person[] === 泛型写法 Array<Person>
//  function actionP (person: Array<Person>): void {
//      console.log(person)
//  }
 
//  let mesP = [{
//      firstName: 'cenhaha',
//      lastName: false,
//      age: 1233
//  }]
 
//  actionP(mesP);
