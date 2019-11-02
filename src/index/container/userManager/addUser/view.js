import React, { Component } from 'react'
import { Button } from 'antd';
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { addClick, removeClick, count, resetClick } = this.props;
        return (
            <div>
                <div><span>点击增加用户数量: { String(count) }</span></div>
                <div>
                    <Button onClick={ addClick }>点击增加</Button>
                    <Button onClick={ removeClick }>点击减少</Button>
                    <Button onClick={ resetClick }>重置数据</Button>
                </div>
            </div>
        )
    }
}

export default Index