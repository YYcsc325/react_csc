import React, { Component } from 'react'
import './index.less';
import { Button, notification } from 'antd';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    onLogin = (bol) => {
        if(bol){
            this.props.history.push('/home')
        }else{
            notification.open({
                message: '消息提示框',
                description:
                  '请先点击登录',
                onClick: () => {
                  console.log('请先点击登录');
                },
            })
        }
        
    }
    render() {
        const { userLogin } = this.props;
        return (
            <div className='login'>
                <Button 
                  type="primary"
                  onClick={()=>{this.props.login({
                      login: true
                  })}}
                >
                    点击登录
                </Button>
                <Button
                  type="primary"
                  onClick={()=>{this.onLogin(userLogin)}}
                >
                    点击跳转
                </Button>
            </div>
        )
    }
}


export default Index