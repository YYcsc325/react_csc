/**
 * @name formView 
 * @auth censhichao
 * @desc 渲染form的数据
 */
import { Component, Fragment } from 'react';
 import { Button, Select, Form } from 'antd'; 

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
         const { config, className} = this.props;
         const { getFieldDecorator } = form;
         const mayLayOut = {
             // 自定义渲染
             custom: (item, newFormItemLayout) => {
                 const { render:_render, style, className, label } = item;
                 const _render = item.render;
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
                 const { onChange, width, placeholder, disabled, rules, initialValue, key } = item;
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
                 const { options = [], onchange, key, rules, label } = item;
                 return (
                    <FormItem
                      label={label}
                      {...newFormItemLayout}
                    >
                        {getFieldDecorator(key,{
                            rules: rules,
                            initialValue: '123',
                        })(
                            <Select
                               onchange={onchange}
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
                     config.map(item => {

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

                        let content = mayLayOut[item.key] && mayLayOut[item.key](item, newFormItemLayout)
                        return <Fragment key={index}>{content}</Fragment>;
                     })
                 }
             </div>
         )
     }
 }
 export default FormView;