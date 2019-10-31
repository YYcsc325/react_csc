import React, { Component } from 'react';
import './index.less';
import { Button,DatePicker,Layout, Menu, Icon } from 'antd'

const { Header, Sider, Content } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    state = {
        collapsed: false,
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            // <div className='header'>
            //     <div className='title'>
            //         React-Demo
            //     </div>
            //     <Button>按钮</Button>
            //     <DatePicker></DatePicker>
            //     <div className='header-menu'>
            //         {
            //             '嘻嘻哈哈'
            //         }
            //     </div>
            // </div>
      <Layout style={{height:"100vh"}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
        )
    }
}

Index.propTypes = {

}

export default Index;