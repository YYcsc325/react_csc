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
            // openKeys: ['01-01']
        }
    }

    // rootSubmenuKeys = ['01', '02']

    // onOpenChange = (openKeys) => {
    //     const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    //     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         this.setState({ openKeys });
    //     } else {
    //         this.setState({
    //             openKeys: latestOpenKey ? [latestOpenKey] : [],
    //         });
    //     }
    // }

    // renderMenu = (arr) => {
    //     return arr.map( item => {
    //         return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
    //                 {item.children && this.renderChildMenu(item.children)}
    //             </SubMenu>
    //     })
    // }

    // renderChildMenu = (arr) => {
    //     return arr.map( item => {
    //         return <Menu.Item key={item.key}><Link to={item.url}>{item.title}</Link></Menu.Item>
    //     } )
    // }
    checked = ( key ) => {
        let res = getTreeNode(MenuData, [], key);
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
                    obj.children.map(item => (<Menu.Item key={item.key}><Link to={item.url} onClick={()=>{this.checked(item.key)}}>{item.title}</Link></Menu.Item>))
                }
            </SubMenu>
        )
    }
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['01']}
                  style={{ height: '100%', borderRight: 0 }}
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