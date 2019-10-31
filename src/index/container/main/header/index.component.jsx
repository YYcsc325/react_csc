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
          <div></div>
        )
    }
}

Index.propTypes = {

}

export default Index;