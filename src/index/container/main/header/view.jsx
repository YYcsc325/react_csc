import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.less';

const { Header } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
          <Header className="header">
              <div className="logo" />
              <span className='tab'>个人中心管理系统</span>
          </Header>
        )
    }
}

Index.propTypes = {

}

export default Index;