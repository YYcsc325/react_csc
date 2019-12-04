/**
 * @name selectInput
 * @param { props }
 * @auth  censhichao
 */
import React from 'react';
import { Select, Input } from 'antd'; 

const Option = Select.Option;
 
 const SelectInput = (props, ref) => {
     // 这个onChane是被formItem包裹之后有的事件，如果调用组件的时候在次传入onChange那么会先调用formItem在调用传入的
     // 这个value是这个formItem包裹的值，映射了两个字段 
     const { onChange, value = {}, disabled, valueDateOne, valueDataTwo, options=[] } = props;
     return <div ref={ref}>
         <Select
            disabled={disabled}
            value={valueDateOne}
            onChange={(e)=>{
                console.log(e)
                onChange({
                    ...value,
                    valueDateOne: e
                })
            }}
         >
             {
                 options.map(items => (<Option key={items.key}>{items.value}</Option>))
             }
         </Select>
         <Input 
            disabled={disabled}
            value={valueDataTwo}
            onChange={(e)=>{
                onChange({
                    ...value,
                    valueDataTwo: e.target.value
                })
            }}
         />
     </div>

 }
 export default React.forwardRef(SelectInput);
