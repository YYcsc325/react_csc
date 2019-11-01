import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import RouterComponent from '../../../router/router';
import './index.less';
// 使Counter能获得到Redux的state，并且能发射action。先来安装react-redux
const { Content } = Layout;
class ContentList extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: ''
    }
  }
  render() {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
          <RouterComponent />
          </Content>
        </Layout>
    )
  }
}
export default ContentList;
