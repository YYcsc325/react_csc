import React, { Component } from 'react';
import { Checkbox, Button } from 'antd'; 
import './index.less'
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
}
export default function listConfig(){
    return [
        {
            key: 'userEmail',
            type: 'input',
            rules: [
                {
                    required: true,
                    message: '必填'
                }
            ],
            style: {
                height: '40px'
            },
            formItemLayout: formItemLayout,
            customRender: () => {
                return <div style={{float: 'left', color: '#434343', fontSize: '11px', fontWeight: 500, lineHeight: '13px', marginBottom: '8px'}}>Email:</div>
            },
            placeholder: 'pleace input username'
        },{
            key: 'passWord',
            type: 'input',
            style: {
                height: '40px'
            },
            formItemLayout: formItemLayout,
            rules: [
                {
                    required: true,
                    message: 'pleace input username'
                }
            ],
            customRender: () => {
                return <div style={{float: 'left', color: '#434343', fontSize: '11px', fontWeight: 500, lineHeight: '13px', marginBottom: '8px'}}>Password:</div>
            },
            placeholder: 'pleace input password'
        },{
            type:'custom',
            key: 'customCheckBox',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='selectCheckBox'>
                    <span style={{float: 'left'}}><Checkbox>Remember me</Checkbox></span>
                    <a>Forgot password?</a>
                </div>
            }
        },{
            type:'custom',
            key: 'customSubmit',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='loginStyle'>Log in</div> 
            }
        },{
            type:'custom',
            key: 'customSubmitText',
            formItemLayout: formItemLayout,
            render: () => {
                return <div className='loginTextStyle'>
                    <div className='loginTextStyle_header'>Don't have an account? Register here.</div>
                    <div className='loginLanguage'>
                        <a>English</a>
                        <a>Deutsch</a>
                        <a>Português</a>
                        <a>Español</a>
                        <a>Français</a>
                    </div>
                </div> 
            }
        }
    ]
}