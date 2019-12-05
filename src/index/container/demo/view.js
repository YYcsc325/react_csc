import React, { Component } from 'react'
import { Form } from 'antd';
import FormView from '../../components/Form/formView.js'
import { getConfig } from './config.js';
import { debounce } from '../../utils/indexAll'
class Index extends Component {
    constructor(props) {
        super(props)
        this.getName = debounce.debounce(this.getName, 1000)
        this.state = {

        }
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