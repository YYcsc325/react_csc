import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuData from '../../../mock/silder';
import { getTreeNode } from '../../../utils/getTreeNode'
import { Layout, Menu, Icon } from 'antd';
import './index.less';


const { SubMenu } = Menu;
const { Sider } = Layout;

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: ['01']
        }
    }

    rootSubmenuKeys = ['01', '02', '03']

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    checked = ( item ) => {
        let res = getTreeNode(MenuData, [], item.key);
        this.props.checkedLink({
            data: res
        });
    }
    showMenu = ( obj ) => {
        const { key, icon, title} = obj;
        return (
            <SubMenu
                key={key}
                title={
                <span>
                    <Icon type={icon} />
                    {title}
                </span>
                }
            >
                {
                    obj.children.map(item => (<Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item>))
                }
            </SubMenu>
        )
    }
    componentDidMount() {

    }
    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  theme='dark'
                //   defaultOpenKeys={this.state.openKeys}
                  style={{ height: '100%', borderRight: 0 }}
                  onSelect={this.checked}
                  onOpenChange={this.onOpenChange}
                  openKeys={this.state.openKeys}
                >
                    {
                        MenuData.map(item => this.showMenu(item))
                    }
                </Menu>
            </Sider>
        )
    }
}

export default Index