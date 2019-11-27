import React, { Component } from 'react'
import { Button } from 'antd';
import { getData } from '../../../serve/method.js'

const url = '/cart/four/123'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    getOption = async() => {
        let res = await getData(url);
        if(res){
            this.setState({
                name: res.data
            })
        }
    }
    render() {
        return (
            <div>
                <Button onClick={this.getOption.bind(this)}>点击发送请求</Button>
                <p>我是用户列表页面</p>
                <span>{this.state.name}</span>
            </div>
        )
    }
}


export default Index