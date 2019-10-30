import React, { Component } from 'react'
import './index.less';
import { Button } from 'antd';


class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    // onLogin = () => {
        
    // }

    render() {
        return (
            <div className='login'>
                登陆页
                <Button
                    // onClick={this.onLogin}
                >
                    点击登录
                </Button>
            </div>
        )
    }
}


export default Index