/**
 * @name FormView 
 * @auth censhichao
 * @desc 渲染form的数据
 */
import React, { Component, Fragment } from 'react';
import { Button, Select, Form, Input } from 'antd'; 

 const Option = Select.Option;
 const FormItem = Form.Item;

 const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

 class FormView extends Component {
     constructor(props){
         super(props)
         this.state = {

         }
     }
     render(){
         const { config, className, form } = this.props;
         const { getFieldDecorator } = form;
         const mayLayOut = {
             // 自定义渲染
             custom: (item, newFormItemLayout) => {
                 const { render:_render, style, className, label } = item;
                 
                 return (
                    <FormItem
                      style={style}
                      className={className}
                      label={
                        <span>{label}</span>
                      }
                      {...newFormItemLayout}
                    >
                        {
                            _render ? _render(item) : null
                        }
                    </FormItem>
                 )
             },
             input: (item, newFormItemLayout) => {
                 const { onChange, width, placeholder, disabled, rules, initialValue, key, label } = item;
                 return (
                    <FormItem
                      label={label}
                      {...newFormItemLayout}
                    >
                    {getFieldDecorator(key, {
                        rules: rules,
                        initialValue: initialValue,
                      })(
                        <Input
                          onChange={onChange}
                          style={{ width: width || '100%' }}
                          placeholder={placeholder}
                          disabled={disabled}
                        />,
                      )}
                    </FormItem>
                 )
             },
             select: (item, newFormItemLayout) => {
                 const { options = [], onchange, key, rules, label, initialValue, placeholder, disabled } = item;
                 return (
                    <FormItem
                      label={label}
                      {...newFormItemLayout}
                    >
                        {getFieldDecorator(key,{
                            rules: rules,
                            initialValue: initialValue,
                        })(
                            <Select
                               onchange={onchange}
                               placeholder={placeholder}
                               disabled={disabled}
                            >
                               {
                                 options.map(items => (<Option key={items.key}>{items.value}</Option>))
                               }
                            </Select>
                        )}
                    </FormItem>
                    
                 )
             },
         }
         return (
             <div className={className}>
                 {
                     config.map((item,index) => {

                        const newFormItemLayout = { ...formItemLayout, ...(item.formItemLayout || {}) };

                        item.rules = item.rules || [
                            {
                              required: false,
                            },
                          ];
                        if (item.required) {
                            item.rules = item.rules.concat({
                              required: true,
                              message: '不得为空',
                            });
                        }

                        let content = mayLayOut[item.type] && mayLayOut[item.type](item, newFormItemLayout)
                        return <Fragment key={index}>{content}</Fragment>;
                     })
                 }
             </div>
         )
     }
 }
 export default FormView;