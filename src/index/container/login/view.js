import React, { Component } from 'react'
import './index.less';
import LeftComponent from './Components/leftComponent';
import RightComponent from './Components/RightComponent'
import { Button, notification } from 'antd';
import loading from '~components/loading/loading'

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // loading.showLoading();
    }
    render() {
        return (
            <div className='signup-form-container'>
                <LeftComponent />
                <RightComponent {...this.props}/>
            </div>
        )
    }
}


export default Index