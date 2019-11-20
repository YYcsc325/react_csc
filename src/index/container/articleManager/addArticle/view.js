import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from '../../../utils/indexAll'
class Index extends Component {
    constructor(props) {
        super(props)
        this.getName = debounce.debounce(this.getName, 1000)
        this.state = {

        }
    }

    componentDidMount() {   

    }
    getName = (target) => {
        let text = /^[1-9]\d*$/;
        if (!target || !text.test(target)) {
            console.log('输入有误')
        }
        if (text.test(target)) {
            console.log(target, 'target')
            console.log('输入成功')
        }
    }
    onChange = ( e ) => { 
        let target = e.target.value;
        this.getName(target);
    }
    render() {
        return (
            <div>
                请输入: <Input 
                    onChange = { this.onChange }
                />
            </div>
        )
    }
}


export default Index