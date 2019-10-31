import React, { Component } from 'react';
import './index.less';

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