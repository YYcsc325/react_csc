import React from 'react';

import {HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../pages/Home/Home';
import Page1 from '../pages/Page1/Page1';
import Counter from '../pages/Counter/Counter';
import UserInfo from '../pages/UserInfo/UserInfo';
//创建历史
const history = createBrowserHistory();
window.appHistory = history;

const getRouter = () => (
    <Router history={history}>
    <div>
      {/* <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
        <li>
          <Link to="/couter">Counter</Link>
        </li>
        <li>
          <Link to="/userinfo">UserInfo</Link>
        </li>
      </ul> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/couter" component={Counter} />
        <Route path="/userinfo" component={UserInfo} />
      </Switch>
    </div>
  </Router>
);
export default getRouter;