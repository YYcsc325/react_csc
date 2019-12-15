import React, { Component } from 'react'
import { Form, Button } from 'antd';
import FormView from '../../components/Form/formView.js'
import { getConfig } from './config.js';
import { debounce } from '../../utils/indexAll'
import StaticModal from '../../components/staticModal/view'

const getshow = StaticModal.getshow;

class Index extends Component {
    constructor(props) {
        super(props)
        this.getName = debounce.debounce(this.getName, 1000)
        this.state = {
            visible: false
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
    handleSubmit = () => {
        const { form } = this.props;
        form.validateFields((err, values)=>{
            if(!err){
                this.props.handleValue(values);
            }
        })
    }
    openModal = () => {
        getshow();
        this.setState({
            visible: true
        })
    }
    checkModal = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const config = getConfig.call(this);
        const { form } = this.props;
        return (
            <div>
                <FormView 
                    config={config}
                    className={'csc'}
                    form={form}
                />
                <Button onClick={this.handleSubmit}>点击提交</Button>
                <StaticModal 
                    visible={this.state.visible}
                    onCancel={this.checkModal}
                    onOk={this.checkModal}
                />
                <Button onClick={()=>{this.openModal()}}>点击打开模态框</Button>
            </div>
        )
    }
}

Index = Form.create({})(Index)
export default Index