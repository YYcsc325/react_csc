/**
 * @name   headerComponent
 * @param  { * } FN
 * @Auth   CENSHICHAO -- A
 * @return <Component>
 * @description 单个select选择框
 */
import { Form, Select ,Col  } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const HeaderSelect = ( props ) => {
    let {
        fn,
        rules,
        initVal,
        dataArr,
        fields,
        getF,
        cols,
        styles,
        labels,
        editFlag
    } = props;
    typeof getF === 'function' ? getF : getF = () => {};
    typeof fn === 'function' ? fn : fn = () => {};

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Col span={cols} style={styles || {}}>
        <FormItem label={labels} {...formItemLayout}>
           {
              getF(fields, {
                rules: rules || [],
                initialValue: initVal || ''
              })(
                <Select
                  onSelect={fn.bind(this,fields)}
                  allowClear={editFlag}
                >
                    {
                        (dataArr || []).map( (item,index)=><Option value={ item.name } key={`item${index}`}>{ item.value }</Option>)
                    }
                </Select>
              )
           }
          </FormItem>
      </Col>
    )   
}

export default HeaderSelect;