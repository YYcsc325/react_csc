import { Component, Fragment } from 'react';
import styles from './FormView.less';
import { Link } from '@alipay/bigfish/sdk/router';
import {
  Form,
  Input,
  Tooltip,
  Radio,
  Icon,
  DatePicker,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  Button,
  Divider,
  Table,
  Row,
  Col,
  Tabs,
  Switch,
  InputNumber,
} from 'antd';

import AdFrogMap from './AdFrogMap';
import UnitQuantityForm from './UnitQuantityForm';
import RadioGroups from './RadioGroups';
import TimeCondition from './TimeCondition';
import PicSelectForm from './PicSelectForm';
import SourceUpload from '~/component/Upload';
import PictureWallForm from './PictureWallForm';
import FileUploadForm from './FileUploadForm';
import { checkValue } from '~/util/is';
import HideMore from './HideMore';
import MultipleTree from './MultipleTree';
import MixPicSelect from './MixPicSelect';
import RadioGroupQr from './RadioGroupQr';
import UnCheckbox from './UnCheckbox';
import SlotUploadForm from './SlotUploadForm';
// import CustomRangePicker from './CustomRangePicker';
// import MoneyInput from './MoneyInput';
// import ScrollViewForm from "./ScrollView/ScrollViewForm";
// import PictureWall from '~/component/PictureWall';
import IconSelect from '~/component/IconSelect';
import RadioCard from '~/component/Form/RadioCard';
import QrCode from '~/component/Form/QrCode';
// some ui seprate components
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const SHOW_ALL = TreeSelect.SHOW_ALL;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

// layout
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

const { TextArea } = Input;

// 用作根据数据生成表单的视图
export default class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: {},
      scrollWidth: 0,
    };
  }

  handleSubmit = e => {
    e.stopPropagation();
    e.preventDefault();

    this.props.onSubmit();
  };

  handleInputEnter(e) {
    e.preventDefault();
  }

  changeHide(list, ifShow) {
    const { showMap } = this.state;
    const newShowMap = Object.assign({}, showMap);
    list.map(item => {
      newShowMap[item] = ifShow;
    });

    this.setState({ showMap: newShowMap });
  }
  /** 不是使用箭头函数，ref实例中不会有此方法  */
  setFieldErrors = errorObj => {
    const { form } = this.props;
    for (let key in errorObj) {
      errorObj[key] = {
        value: form.getFieldValue(key),
        errors: [new Error(errorObj[key])],
      };
    }
    form.setFields(errorObj);
  };

  render() {
    const {
      form,
      config,
      hideRequiredMark,
      fromConfig = {},
      formData: data = {},
      allData,
      itemWrapper,
      className,
      hideKeys = [],
    } = this.props;
    const { getFieldDecorator } = form;
    const { showMap } = this.state;
    // when in unit mode, form is used in father componnet,just do item
    // const Wrapper = useFragement ? Fragment : Form;
    const mapTypeToUI = {
      ...AdFrogMap({ form, data }),
      custom: (item, index, newFormItemLayout) => {
        // console.log('data', data);
        // console.log('item.key', item.key);
        const _render = item.render;
        const { style = {} } = item;
        return (
          <FormItem
            style={{ display: item.display, ...style }}
            className={item.point ? styles.requiredPoint : ''}
            label={item.label}
            {...newFormItemLayout}
          >
            {_render ? _render(data[item.key], data) : data[item.key]}
          </FormItem>
        );
      },
      search: item => {
        return (
          <FormItem>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <Search
                placeholder={item.placeholder}
                onPressEnter={item.onPressEnter}
                onSearch={item.onSearch}
              />,
            )}
          </FormItem>
        );
      },
      // money: (item, index, newFormItemLayout) => {
      //   const visiable = item.visiable ? item.visiable(allData) : true
      //   if (!visiable) return null;
      //   const disabled = !!item.disabled;
      //   // console.log('newFormItemLayout', newFormItemLayout);
      //   return (
      //     <FormItem
      //       style={{display: item.display}}
      //       label={
      //         (
      //           <span>
      //             <span>
      //             {item.label}
      //             {
      //               item.tips ? <Tooltip title={item.tips}>
      //               <Icon type="question-circle-o" />
      //             </Tooltip> : null
      //             }
      //             </span>
      //           {item.info && <Icon type="info-circle" theme="filled" style={{color: 'rgb(37, 147, 257)'}} />}
      //           </span>
      //         )
      //       } { ...newFormItemLayout } >
      //       {getFieldDecorator(item.key, {
      //         rules: item.rules,
      //         initialValue: data[item.key] || item.initialValue,
      //         validateFirst: item.validateFirst,
      //       })(
      //         <MoneyInput
      //           onPressEnter={this.handleInputEnter}
      //           style={{width: item.width || '100%'}}
      //           placeholder={item.placeholder}
      //           addonafter={item.addonafter}
      //           disabled = {disabled}
      //         />
      //       )}
      //       <p className="input-afterwords">{item.afterWords}</p>
      //     </FormItem>
      //   );
      // },
      input: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        const disabled = !!item.disabled;
        // console.log('newFormItemLayout', newFormItemLayout);
        return (
          <FormItem
            style={{ display: item.display }}
            label={
              <span>
                <span>
                  {item.label}
                  {item.tips ? (
                    <Tooltip title={item.tips}>
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  ) : null}
                </span>
                {item.info && (
                  <Icon type="info-circle" theme="filled" style={{ color: 'rgb(37, 147, 257)' }} />
                )}
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
              validateFirst: item.validateFirst || true,
            })(
              <Input
                onChange={item.onChange}
                onBlur={item.onBlur}
                onPressEnter={this.handleInputEnter}
                style={{ width: item.width || '100%' }}
                placeholder={item.placeholder}
                addonafter={item.addonafter}
                disabled={disabled}
              />,
            )}
            {item.afterIcon && <span>&nbsp;{item.afterIcon}</span>}
            {item.afterWords && <div className="input-afterwords">{item.afterWords}</div>}
          </FormItem>
        );
      },
      inputNumber: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        const disabled = !!item.disabled;
        return (
          <FormItem
            style={{ display: item.display }}
            label={
              <span>
                <span>
                  {item.label}
                  {item.tips ? (
                    <Tooltip title={item.tips}>
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  ) : null}
                </span>
                {item.info && (
                  <Icon type="info-circle" theme="filled" style={{ color: 'rgb(37, 147, 257)' }} />
                )}
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: item.width || '100%' }}
                max={item.max}
                min={item.min}
                precision={item.precision}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder={item.placeholder}
                disabled={disabled}
              />,
            )}
            <p className="input-afterwords">{item.afterWords}</p>
          </FormItem>
        );
      },
      textArea: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        const disabled = !!item.disabled;
        return (
          <FormItem
            label={
              <span>
                <span>{item.label}</span>
                {item.info && (
                  <Icon type="info-circle" theme="filled" style={{ color: 'rgb(37, 147, 257)' }} />
                )}
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <TextArea
                rows={item.rows || 1}
                autosize={item.autosize || null}
                placeholder={item.placeholder}
                addonafter={item.addonafter}
                disabled={disabled}
              />,
            )}
          </FormItem>
        );
      },
      groupSelect: (item, index, newFormItemLayout) => {
        const OptionUi = opt => (
          <Option key={opt.value} value={opt.value} disabled={opt.disabled || false}>
            {opt.text}
            {opt.linkUrl && opt.linkName ? (
              <Link style={{ float: 'right' }} to={opt.linkUrl} target="_blank">
                {opt.linkName}
              </Link>
            ) : (
              ''
            )}
          </Option>
        );

        return (
          <FormItem style={{ display: item.display }} label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: checkValue(data[item.key], item.initialValue),
            })(
              <Select
                mode={item.mode || ''}
                placeholder={item.placeholder}
                style={{ width: item.width || '100%' }}
                onChange={item.onChange}
                showSearch={item.showSearch}
                onSearch={item.onSearch}
                disabled={item.disabled}
                allowClear={item.allowClear ? true : false}
              >
                {item.options.map(item => {
                  return item.label && item.children ? (
                    <OptGroup key={item.label} label={item.label}>
                      {item.children.map(child => OptionUi(child))}
                    </OptGroup>
                  ) : (
                    OptionUi(item)
                  );
                })}
              </Select>,
            )}
          </FormItem>
        );
      },
      select: (item, index, newFormItemLayout) => {
        const hasSubTitle = item.subTitle;
        return (
          <FormItem style={{ display: item.display }} label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: checkValue(data[item.key], item.initialValue),
            })(
              <Select
                showTooltip={item.showTooltip ? true : false}
                mode={item.mode || ''}
                placeholder={item.placeholder}
                style={{ width: item.width || '100%' }}
                onChange={item.onChange}
                showSearch={item.showSearch}
                onSearch={item.onSearch}
                disabled={item.disabled}
                filterOption={item.filterOption}
                allowClear={item.allowClear ? true : false}
                dropdownRender={item.dropdownRender}
              >
                {item.options.map(item => (
                  <Option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled || false}
                    title={item.text}
                  >
                    {item.text}
                  </Option>
                ))}
              </Select>,
            )}
            {item.link && item.link.text && item.link.url ? (
              <Link style={{ marginLeft: 15 }} to={item.link.url} target="_blank">
                {item.link.text}
              </Link>
            ) : null}
          </FormItem>
        );
      },
      switch: (item, index, newFormItemLayout) => {
        return (
          <FormItem style={{ display: item.display }} label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<Switch defaultChecked disabled={item.disabled} />)}
          </FormItem>
        );
      },
      radioButton: (item, index, newFormItemLayout) => {
        const subTitle = item.subTitle;
        return (
          <Fragment>
            <span>{subTitle} </span>
            <FormItem label={item.label} {...newFormItemLayout}>
              {getFieldDecorator(item.key, {
                rules: item.rules,
                initialValue: data[item.key] || item.initialValue,
              })(
                <RadioGroup buttonStyle="solid" disabled={item.disabled} onChange={item.onChange}>
                  {item.options.map(item => (
                    <RadioButton key={item.value} value={item.value}>
                      {item.text}
                    </RadioButton>
                  ))}
                </RadioGroup>,
              )}
            </FormItem>
          </Fragment>
        );
      },
      radioGroup: (item, index, newFormItemLayout) => {
        const subTitle = item.subTitle;
        return (
          <Fragment>
            <FormItem className={styles.checkbox} label={item.label} {...newFormItemLayout}>
              <span>{subTitle} </span>
              {getFieldDecorator(item.key, {
                rules: item.rules,
                initialValue: data[item.key] || item.initialValue,
              })(
                <RadioGroup disabled={item.disabled} onChange={item.onChange}>
                  <Row>
                    {item.options.map((item, k) => {
                      return item.hasTips ? (
                        // <Col span={6} key={k}>
                        <Radio key={item.value} value={item.value}>
                          {item.text}
                          <Tooltip title={item.tipsText}>
                            <Icon type="question-circle-o" style={{ marginLeft: 5 }} />
                          </Tooltip>
                        </Radio>
                      ) : (
                        // </Col>
                        // <Col span={6} key={k}>
                        <Radio key={item.value} value={item.value}>
                          {item.text}
                        </Radio>
                      );
                      // </Col>
                    })}
                    {item.afterWords && item.afterWords}
                  </Row>
                </RadioGroup>,
              )}
            </FormItem>
          </Fragment>
        );
      },
      radioGroups: (item, index, newFormItemLayout) => {
        return (
          <FormItem
            label={
              <span>
                <span>{item.label}</span>
                {item.info && (
                  <Icon type="info-circle" theme="filled" style={{ color: 'rgb(37, 147, 257)' }} />
                )}
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<RadioGroups disabled={item.disabled} config={item} />)}
          </FormItem>
        );
      },
      checkboxGroup: (item, index, newFormItemLayout) => {
        const { options = [] } = item;
        return (
          <FormItem
            className={styles.checkbox}
            style={{ display: item.display }}
            label={
              <span>
                <span>{item.label}</span>
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <CheckboxGroup disabled={item.disabled} options={options} onChange={item.onChange} />,
            )}
          </FormItem>
        );
      },
      UnCheckbox: (item, index, newFormItemLayout) => {
        return (
          <FormItem
            className={styles.checkbox}
            style={{ display: item.display }}
            label={
              <span>
                <span>{item.label}</span>
              </span>
            }
            {...newFormItemLayout}
          >
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: item.initialValue || data[item.key],
            })(<UnCheckbox item={item} />)}
          </FormItem>
        );
      },
      datePicker: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<DatePicker disabled={item.disabled} />)}
          </FormItem>
        );
      },
      rangePicker: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} wrapperCol={{}} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<RangePicker disabled={item.disabled} style={{ width: 250 }} />)}
          </FormItem>
        );
      },
      // CustomRangePicker: (item, index, newFormItemLayout) => {
      //   return (
      //     <FormItem label={item.label} wrapperCol={{}} { ...newFormItemLayout } >
      //       {getFieldDecorator(item.key, {
      //         rules: item.rules,
      //         initialValue: data[item.key] || item.initialValue,
      //       })(
      //         <CustomRangePicker
      //           disabled= {item.disabled}
      //           style={{width: 250}}
      //         />
      //       )}
      //      </FormItem>
      //   );
      // },
      unitQuantityForm: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<UnitQuantityForm disabled={item.disabled} />)}
          </FormItem>
        );
      },
      timeCondition: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<TimeCondition config={item} disabled={item.disabled} />)}
          </FormItem>
        );
      },
      multipleTreeSelect: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        const tProps = {
          disabled: item.disabled,
          treeData: item.treeData,
          treeCheckable: item.treeCheckable || false,
          treeDefaultExpandAll: item.treeDefaultExpandAll || false,
          showCheckedStrategy: item.showCheckedStrategy || SHOW_PARENT,
          searchPlaceholder: item.placeholder || '请选择',
          dropdownStyle: { maxHeight: 400, overflow: 'auto' },
          style: {
            width: 300,
          },
        };
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<TreeSelect {...tProps} />)}
          </FormItem>
        );
      },
      multipleTree: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<MultipleTree disabled={item.disabled} {...item} />)}
          </FormItem>
        );
      },
      customHtml: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(item.html)}
          </FormItem>
        );
      },
      cascader: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <Cascader
                style={{ width: item.width || '100%' }}
                disabled={item.disabled}
                options={item.options}
                displayRender={item.displayRender}
                placeholder="请选择"
              />,
            )}
          </FormItem>
        );
      },
      picSelectForm: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <PicSelectForm
                className="select-form"
                onItemChange={item.onChange}
                onUpload={item.onUpload}
                action={item.action}
                customChoice={item.customChoice}
                onCustomChoice={item.onCustomChoice}
                attachments={item.attachments || []}
                isSinglePic={item.isSinglePic}
                checkAction={item.checkAction}
                header={item.header}
                after={item.after}
              />,
            )}
          </FormItem>
        );
      },
      pictureWallForm: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <PictureWallForm
                action={item.action}
                previewVisible={item.previewVisible || false}
                previewImage={item.previewImage || ''}
                maxNum={item.maxNum || 0}
                beforeUpload={item.beforeUpload}
                onChange={item.onChange}
                config={item}
              />,
            )}
          </FormItem>
        );
      },
      fileUploadForm: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <FileUploadForm
                action={item.action}
                btnText={item.btnText}
                afterTips={item.afterTips}
                previewVisible={item.previewVisible || false}
                previewImage={item.previewImage || ''}
                maxNum={item.maxNum || 0}
                header={item.header}
                data={item.data}
                beforeUpload={item.beforeUpload}
                onChange={item.onChange}
                config={item}
                onSuccess={item.onSuccess}
              />,
            )}
          </FormItem>
        );
      },
      slotUploadForm: (item, index, newFormItemLayout) => {
        return (
          <div style={{ position: 'relative' }}>
            <FormItem label={item.label} {...newFormItemLayout}>
              {getFieldDecorator(item.key, {
                rules: item.rules,
                initialValue: data[item.key] || item.initialValue,
              })(
                <SlotUploadForm
                  btnText={item.btnText}
                  header={item.header}
                  afterWords={item.afterWords}
                  action={item.action}
                  beforeUpload={item.beforeUpload}
                  onChange={item.onChange}
                  onCustomChoice={item.onCustomChoice}
                  materialList={item.materialList}
                  checkAction={item.checkAction}
                  onUpload={item.onUpload}
                  data={item.data}
                />,
              )}
            </FormItem>
            {item.previewImage && (
              <div style={{ float: 'right', position: 'absolute', top: -60, right: 10 }}>
                <p>{item.desc}</p>
                <img width={375} src={item.previewImage} alt="" />
              </div>
            )}
          </div>
        );
      },
      formtitle: item => {
        const { hr = false, render } = item;
        return (
          <div style={{ marginBottom: '24px' }}>
            {hr && <Divider />}
            <Row>
              <Col span={6}>
                <div className={styles.showTitle}>
                  <span className={styles.verticalLine} />
                  <span>{item.label}</span>
                </div>
              </Col>
              <Col span={18}>{render && item.render()}</Col>
            </Row>
          </div>
        );
      },
      showTable: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            <div>
              <Table
                bordered
                style={{ width: item.width }}
                dataSource={item.data}
                columns={item.columns}
                rowKey={item.rowKey || 'id'}
                pagination={item.pagination || false}
              />
            </div>
          </FormItem>
        );
      },
      hideMore: item => {
        return (
          <Row style={{ marginBottom: '24px' }}>
            {/* <Col span={6}>{item.label}</Col> */}
            <Col span={18}>
              <HideMore {...item} changeHide={this.changeHide.bind(this)} />
            </Col>
          </Row>
        );
      },
      mixPicSelect: (item, index, newFormItemLayout) => {
        const visiable = item.visiable ? item.visiable(allData) : true;
        if (!visiable) return null;
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key],
            })(
              <MixPicSelect
                className="select-form"
                onItemChange={item.onChange}
                action={item.action}
                onUpload={item.onUpload}
                onCustomChoice={item.onCustomChoice}
                checkAction={item.checkAction}
                customChoice={item.customChoice}
                attachments={item.attachments || []}
                header={item.header}
                after={item.after}
                showFileName={item.showFileName}
                beforeUpload={item.beforeUpload}
                filterSameName={item.filterSameName}
                picType={item.picType}
                onClickCustom={item.onClickCustom}
                scrollData={item.scrollData}
                scrollType={item.scrollType}
              />,
            )}
          </FormItem>
        );
      },
      radioGroupQr: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key)(
              <RadioGroupQr
                pageSelect={item.pageSelect}
                actionList={item.actionList}
                onActionTypeChange={item.onActionTypeChange}
              />,
            )}
          </FormItem>
        );
      },
      iconSelect: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(
              <IconSelect
                options={item.options}
                onChange={item.onChange}
                disabled={item.disabled}
              />,
            )}
          </FormItem>
        );
      },
      radioCard: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<RadioCard {...item} />)}
          </FormItem>
        );
      },
      qrcode: (item, index, newFormItemLayout) => {
        return (
          <FormItem label={item.label} {...newFormItemLayout}>
            {getFieldDecorator(item.key, {
              rules: item.rules,
              initialValue: data[item.key] || item.initialValue,
            })(<QrCode {...item} />)}
          </FormItem>
        );
      },
    };
    return (
      <Form
        {...fromConfig}
        hideRequiredMark={hideRequiredMark || false}
        onSubmit={this.handleSubmit}
      >
        <div className={styles[className] || styles.container}>
          {config.map((item, index) => {
            const newFormItemLayout = { ...formItemLayout, ...(item.formItemLayout || {}) };

            // 隐藏项
            item.display = hideKeys.includes(item.key)
              ? 'none'
              : showMap[item.key] === true
              ? 'none'
              : 'block';

            item.rules = item.rules || [
              {
                required: false,
              },
            ];
            let isAliveRequireItem = item.rules.find(item => item.required);

            if (item.required && !isAliveRequireItem) {
              item.rules = item.rules.concat({
                required: true,
                message: '不得为空',
              });
            }

            const content =
              (mapTypeToUI[item.type] && mapTypeToUI[item.type](item, index, newFormItemLayout)) ||
              null;
            let resNode = content;
            if (item.formWrapper) {
              resNode = item.formWrapper(resNode);
            }
            if (itemWrapper) {
              resNode = itemWrapper(resNode);
            }
            // resNode = content;
            return <Fragment key={index}>{resNode}</Fragment>;
          })}
        </div>
      </Form>
    );
  }
}
