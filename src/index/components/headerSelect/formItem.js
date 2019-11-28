/**
 * @name   SelectInput
 * @param  { * } FN
 * @Auth   CENSHICHAO -- A
 * @return <Component>
 */
import { Select, Input } from 'antd';
import React from 'react';

const { Option } = Select;
const SelectInput = (props, ref) => {
    // onChange是formItem包裹的事件（能够改变form中的值），value是initvalue被form观察的
    // 如果组件传入了onChange，那么会两个事件都触发（formItem跟传入的）
    const {  options = [], onChange, value = {} } = props;  
    return (
        <div ref={ref}>
            <Select
                style={{width: '100px',display: 'inline-block'}}
                value={value.select}
                placeholder='请选择'
                onChange={
                    e => {
                        onChange({   // 从新写入form表单
                            ...value,
                            select: e
                        })
                    }
                }
            >
                {
                    options.map( (item,index)=><Option value={ item.name } key={`item${index}`}>{ item.value }</Option>)
                }
            </Select>
            <Input 
               addonAfter={'次'}
               style={{width: '120px',display: 'inline-block',marginLeft: '15px'}}
               value={value.input}
               placeholder='请输入'
               onChange={
                e => {     
                    onChange({
                        ...value,
                        input: e.target.value
                    })
                }
            }
            />
        </div>
    )
}
// frequencyBand: {
//     label: '频控',
//     key: 'frequencyBand',
//     type: 'custom',
//     point: true,
//     render: ()=>{
//       return (
//         form.getFieldDecorator('frequencyBand', {
//           rules: [{
//               validator(rule, value = '', callback) {
//                   if (!value || (typeof value === 'object' && Object.keys(value).length === 0)) {
//                     callback('请选择并且输入有效的频控');
//                     return;
//                   }
//                   if(value || (typeof value === 'object' && Object.keys(value).length > 0)){
//                     if(!value.hasOwnProperty('select')){
//                       callback('请选择频控月份')
//                       return 
//                     }
//                     if(!value.hasOwnProperty('input')){
//                       callback('请输入频控内容')
//                       return
//                     }
//                   }
//                   callback();
//                 },
//           }],
//           initialValue: {
//             select: 1,
//             input: 123
//           }
//       })(
//           <SelectInput 
//             options={options}
//             // onChange = {(value) => {
//             //   console.log(value,'value')
//             // }}
//           />
//       )
//       )
//     }
//   },
export default React.forwardRef(SelectInput)
