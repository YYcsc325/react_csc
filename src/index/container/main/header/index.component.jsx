import React, { Component } from 'react';
import './index.less';
import { Layout } from 'antd'
const { Header } = Layout;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state={}
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
              <span className='tab'>标签头部</span>
          </Header>
        )
    }
}

Index.propTypes = {

}

export default Index;