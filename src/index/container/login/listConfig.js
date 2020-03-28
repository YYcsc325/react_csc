import React, { Component } from 'react';
import { Checkbox, Button } from 'antd'; 
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
                return <div>
                    <span style={{float: 'left'}}><Checkbox>Remember me</Checkbox></span>
                    <a style={{float: 'right', color: '#3195cb', fontSize: '13px', textAlign: 'right'}}>Forgot password?</a>
                </div>
            }
        },{
            type:'custom',
            key: 'customSubmit',
            formItemLayout: formItemLayout,
            render: () => {
                return <div style={{height: '50px', borderRadius: '4px', backgroundColor: '#3195cb', cursor: 'pointer', textAlign: 'center', fontSize: '17px', color: '#fff', lineHeight: '50px'}}>Log in</div> 
            }
        }
    ]
}