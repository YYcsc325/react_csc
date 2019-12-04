/**
 * @name 公共配置文件
 */
import React from 'react';
import SelectInput from './selectInput.js'

export function getBaseConfig(props){
    const { form } = this.props;
    return {
        input: {
            key: 'input',
            type: 'input',
            label: '输入框',
            rules: [
                {
                    required: true,
                    message: '必填'
                }
            ],
            placeholder: '请输入'
        },
        custom: {
            type:'custom',
            key: 'custom',
            label: '自定义',
            render: () => {
                return <span>我是自定义渲染的</span>
            }
        },
        double: {
            type:'custom',
            key: 'doubleCustom',
            label: '映射两个字段',
            render: (config) => {
                const { valueDateOne, valueDataTwo, disabled, options = []} = config;
                return form.getFieldDecorator('doubleCustom',{
                    rules: [
                        {
                            validator: (rule, value = {}, callback) => {
                                callback();
                            }
                        }
                    ],
                    initialValue: {
                        valueDateOne: valueDateOne,
                        valueDataTwo: valueDataTwo
                    }
                })(
                    <SelectInput 
                        options={options}
                        // valueDateOne={valueDateOne}
                        // valueDataTwo={valueDataTwo}
                        disabled={disabled || false}
                        onChange={(value)=>{
                            console.log(value)
                        }}
                    />
                )
            }
        }
    }
}