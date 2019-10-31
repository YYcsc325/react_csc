import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

class Home extends Component {
    render() {
        return (
            <Layout>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">
                    <Link to="/">首页</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/page1">Page1</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/couter">Counter</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/userinfo">UserInfo</Link>
                  </Menu.Item>
                </Menu>
                <div className='content'>我是主体</div>
          </Layout>
        )
    }
}
export default Home;