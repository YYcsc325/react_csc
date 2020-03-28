import React, { Component } from 'react';
import RedicretComponent from './redicret';
import { mockData } from '../mockData';
import { Form } from 'antd';
import FormView from '~components/Form/formView.js';
import listConfig from '../listConfig';
import '../index.less';

class RightComponent extends Component {
    render(){
        const config = listConfig.call(this);
        const { form } = this.props;
        return (
            <div className='form_wrapper'>
                <div className='form_container'>
                    <h1>Log in</h1>
                    <div className='soc_connect'>
                        {
                            (mockData || []).map(item => <RedicretComponent {...item} key={item.rel}/>)
                        }
                    </div>
                    <div className='ls_or'>
                        <div className='ls_line'></div>
                        <div className='ls_text'>or use your email:</div>
                    </div>
                    <div>
                      <FormView 
                        config={config}
                        className={'RightComponent'}
                        form={form}
                      />
                    </div>
                </div>
            </div>
        )
    }
}
RightComponent = Form.create({})(RightComponent)
export default RightComponent