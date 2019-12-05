import React, { Component } from 'react'
import { Form } from 'antd';
import FormView from '../../components/Form/formView.js'
import { getConfig } from './config.js';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const config = getConfig.call(this);
        const { form } = this.props;
        return (
            <div>
                <FormView 
                    config={config}
                    className={'cl'}
                    form={form}
                />
            </div>
        )
    }
}

Index = Form.create({})(Index)
export default Index