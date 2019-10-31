import React, { Component } from 'react';
import './index.less';
import { Button,DatePicker } from 'antd'

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
            <div className='header'>
                <div className='title'>
                    React-Demo
                </div>
                {/* <Button>按钮</Button>
                <DatePicker></DatePicker> */}
                <div className='header-menu'>
                    {
                        '嘻嘻哈哈'
                    }
                </div>
            </div>
        )
    }
}

Index.propTypes = {

}

export default Index;