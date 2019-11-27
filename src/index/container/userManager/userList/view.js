import React, { Component } from 'react'
import { Button } from 'antd';
import { getParams, getQuery, post } from '../../../serve/method.js'
import API from '../../../serve/API'

const { userListName, userListName2, userListName3 } = API;
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            name2: '',
            name3: ''
        }
    }
    getOption = async() => {
        let res = await getParams(userListName, 123);
        if(res){
            this.setState({
                name: res.data
            })
        }
    }
    getOptionTwo = async() => {
        let obj = {
            id: 123
        }
        let res = await getQuery(userListName2, obj);
        if(res){
            this.setState({
                name2: res.data
            })
        }
    }
    getOptionThree = async() => {
        let obj = {
            id: 123
        }
        let res = await post(userListName3, obj)
        if(res && res.data.status == '0'){
            const { result } = res.data;
            this.setState({
                name3: result
            })
        }
    }
    render() {
        return (
            <div>
                <Button onClick={this.getOption.bind(this)}>点击发送请求</Button>
                <Button onClick={this.getOptionTwo.bind(this)}>不同的请求发送</Button>
                <Button onClick={this.getOptionThree.bind(this)}>发送post请求</Button>
                <p>我是用户列表页面</p>
                <span>{this.state.name}{this.state.name2}{this.state.name3}</span>
            </div>
        )
    }
}


export default Index