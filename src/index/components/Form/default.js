import moment from 'moment';
import CityMuilt from './CityMuilt';
import ModalFormView from '~/component/ModalForm';
import TagView from './TagView';
import { Icon, Popover } from 'antd';
import { nameRex, initOptions, addTreeKey } from '../../utils';
import { getIn } from '~/util/manipulate';
import { yuan } from '~/util/utils';

const quToutiao = '400200';
const ruanGaoyun = '400100';
const TANX = '400300';
const newUser = '9024073088726780471';

export function baseGroupConfig(props, showFields, sceneCode) {
  const self = this;
  const {
    planDataList: { list },
    dmpCrowdList = [],
    // mediaSceneList = [],
    mediaPosList = [],
    mediaArr = [], // 投放范围数据
    formData,
  } = props;
  const { planId } = props.location.query;
  const {
    ageTagList = [],
    genderTagList = [],
    residenceLevelList = [],
    residenceTagList = [],
    mediaTradeList = [],
    interestTagList = [],
    crowdList = [],
    regionList = [],
    osList = [],
    mediaRegionList = [],
    deviceNetList = [],
    deviceTypeList = [],
    deviceNetworkList = [],
    userActiveTagList = [],
  } = props.groupDict;

  const { unitPrice, totalPrice, mediaId, mediaArrTwo } = this.state;

  let areaDisable = false;
  let sexDisable = false;
  let ageDisable = false;
  let regionDisable = false;
  if (sceneCode === 'XAB') {
    const { form } = props;
    const res = form.getFieldsValue(['mediaTagListTwo', 'userActiveTagList']);
    if (res.mediaTagListTwo === quToutiao && res.userActiveTagList === newUser) {
      areaDisable = true;
      regionDisable = true;
    }
    if (
      (res.mediaTagListTwo === ruanGaoyun || res.mediaTagListTwo === TANX) &&
      res.userActiveTagList === newUser
    ) {
      areaDisable = true;
      sexDisable = true;
      ageDisable = true;
      regionDisable = true;
    }
  }

  return {
    checkAppTitle: {
      label: '单元信息',
      key: 'checkAppTitle',
      type: 'formtitle',
    },
    planId: {
      label: '计划名称',
      key: 'planId',
      type: 'select',
      placeholder: '请选择计划',
      width: 300,
      initialValue: Number(planId) || undefined,
      disabled: !!planId,
      options: initOptions(list, 'planName', 'planId'),
      configRules: {
        REQUIRED: () => {
          return [
            {
              required: true,
              message: '请选择计划',
            },
          ];
        },
      },
    },
    groupName: {
      label: '单元名称',
      key: 'groupName',
      type: 'input',
      validateFirst: true,
      placeholder: '最多10个中文字/20个英文字',
      width: 300,
      configRules: {
        REQUIRED: () => {
          return nameRex();
        },
      },
    },
    groupCharge: {
      label: '出价（元）',
      key: 'groupCharge',
      type: 'input',
      placeholder: ({ minFormat, maxFormat }, isRange) => {
        return isRange ? `请输入${minFormat}~${maxFormat}的数字` : `请输入出价`;
      },
      validateFirst: true,
      width: 300,
      rules: [],
      configRules: {
        REQUIRED: () => {
          return [
            {
              required: true,
              message: '出价不能为空，请输入',
            },
          ];
        },
        RANGE: ({ minFormat, maxFormat, minCanEqual, maxCanEqual }) => {
          return [
            {
              validator: function(rule, value, callback) {
                value = Number(value);
                if (
                  (value > Number(minFormat) && value < Number(maxFormat)) ||
                  (minCanEqual && value === Number(minFormat)) ||
                  (maxCanEqual && value === Number(maxFormat))
                ) {
                  callback();
                  return;
                }
                callback(
                  `出价需在${minFormat}~${maxFormat}之间，不能低于${minFormat}元，请重新输入`,
                );
              },
              message: `出价需在${minFormat}~${maxFormat}之间的数字，不能低于${minFormat}元，请重新输入`,
            },
            {
              pattern: /^(([1-9]{0,1}[0-9]{0,2})|(([0]\.\d{1,2}|[1-9]{0,1}[0-9]{0,2}\.\d{1,2})))$/,
              message: '出价必须为2位小数，请重新输入',
            },
          ];
        },
      },
    },
    wufuPackage: {
      label: '五福套餐',
      key: 'wufu',
      type: 'formtitle',
    },
    profileName: {
      label: '套餐名称',
      key: 'profileName',
      type: 'custom',
    },
    description: {
      label: '套餐内容',
      key: 'description',
      type: 'custom',
    },
    media: {
      label: '媒体定向',
      key: 'media',
      type: 'formtitle',
    },
    flowType: {
      label: '流量类型',
      key: 'flowType',
      type: 'radioGroup',
      width: 300,
      rules: [
        {
          required: true,
          message: '请选择流量类型',
        },
      ],
      options: [
        {
          value: '1',
          text: '生活号',
        },
        {
          value: '2',
          text: '小程序',
        },
        {
          value: '3',
          text: '支付成功页',
        },
      ],
    },
    mediaTradeList: {
      label: '行业类型',
      key: 'mediaTradeList',
      type: 'multipleTreeSelect',
      width: 300,
      treeCheckable: true,
      placeholder: '请选择行业类型',
      treeData: addTreeKey(mediaTradeList),
    },
    mediaRegionList: {
      label: '设备所在地',
      key: 'mediaRegionList',
      type: 'custom',
      render: function() {
        const treeData = [
          {
            canSelect: true,
            children: addTreeKey(mediaRegionList),
            key: 'selectAll',
            title: '全选',
            value: 'selectAll',
          },
        ];
        return (
          <div>
            <TagView
              TreeList={props.formData.mediaRegionList || []}
              TreeData={treeData[0].children}
              afterClose={self.handleTreeDelete}
              closeText="mediaRegionList"
            />
            <ModalFormView
              linkConfig={{ content: '选择省份城市>', linkType: 'a' }}
              modalConfig={{ title: '选择省份城市', width: 650 }}
              formConfig={[
                {
                  key: 'mediaRegionList',
                  type: 'multipleTree',
                  formItemLayout: {
                    labelCol: {
                      xs: { span: 24 },
                      sm: { span: 6 },
                    },
                    wrapperCol: {
                      xs: { span: 24 },
                      sm: { span: 24 },
                    },
                  },
                  initialValue: props.formData.mediaRegionList || [],
                  treeData,
                  expandedKeys: ['selectAll'],
                },
              ]}
              handleSubmit={self.handleModelSubmit.bind(self)}
            />
          </div>
        );
      },
    },
    crowd: {
      label: '人群定向',
      key: 'crowd',
      type: 'formtitle',
    },
    genderTagList: {
      label: '性别',
      key: 'genderTagList',
      type: 'UnCheckbox',
      width: 300,
      options: genderTagList,
      disabled: sexDisable,
    },
    ageTagList: {
      label: '年龄段',
      key: 'ageTagList',
      type: 'UnCheckbox',
      width: 300,
      options: ageTagList,
      disabled: ageDisable,
    },
    residenceTagList: {
      label: '常住地',
      key: 'city',
      type: 'custom',
      width: 300,
      configRules: {
        REQUIRED: () => {
          return [
            {
              required: true,
              message: '请选择常住地',
            },
          ];
        },
      },
      render: function() {
        const { form, formData } = self.props;
        const treeData = [
          {
            canSelect: true,
            children: addTreeKey(residenceTagList),
            key: 'selectAll',
            title: '全选',
            value: 'selectAll',
          },
        ];
        return (
          <CityMuilt
            treeConfig={{
              /** fix  Warning: 'label' in treeData is deprecated. Please use 'title' instead. */
              treeData: residenceLevelList.map(item => ({ title: item.label, value: item.value })),
              treeCheckable: true,
              value: formData.residenceLevelList || [],
              treeDefaultExpandAll: true,
              onChange: self.treeChange,
              style: {
                width: 300,
              },
              disabled: areaDisable,
            }}
            showFields={showFields}
            onChange={self.handleCityTabChange.bind(self)}
            form={form}
            formData={formData}
            handleTreeDelete={self.handleTreeDelete}
            initialValue={
              self.state.citytab === '1' ? formData.residenceTagList : formData.residenceLevelList
            }
            activeKey={self.state.citytab}
            treeData={treeData}
            handleModalSubmit={self.handleModelSubmit.bind(self)}
            disabled={areaDisable}
          />
        );
      },
    },
    interestTagList: {
      label: '用户偏好',
      key: 'interestTagList',
      type: 'custom',
      render: function() {
        const treeData = [
          {
            canSelect: true,
            children: addTreeKey(interestTagList),
            key: 'selectAll',
            title: '全选',
            value: 'selectAll',
          },
        ];
        return (
          <div>
            <TagView
              TreeList={props.formData.interestTagList || []}
              TreeData={treeData[0].children}
              afterClose={self.handleTreeDelete}
              closeText="interestTagList"
            />
            <ModalFormView
              linkConfig={{ content: '选择用户偏好>', linkType: 'a' }}
              modalConfig={{ title: '选择用户偏好', width: 650 }}
              formConfig={[
                {
                  key: 'interestTagList',
                  type: 'multipleTree',
                  formItemLayout: {
                    labelCol: {
                      xs: { span: 24 },
                      sm: { span: 6 },
                    },
                    wrapperCol: {
                      xs: { span: 24 },
                      sm: { span: 24 },
                    },
                  },
                  initialValue: props.formData.interestTagList || [],
                  treeData,
                  expandedKeys: ['selectAll'],
                },
              ]}
              handleSubmit={self.handleModelSubmit.bind(self)}
            />
          </div>
        );
      },
    },
    crowdList: {
      width: 300,
      label: '行业主题人群',
      key: 'crowdList',
      type: 'select',
      placeholder: '选择行业主题人群',
      allowClear: true,
      options: crowdList.map(item => {
        return {
          ...item,
          text: item.label,
        };
      }),
    },
    dmpCrowdList: {
      width: 300,
      label: (
        <span>
          自定义用户{' '}
          <Popover content={'应用人群管理中创建的人群'}>
            <Icon type="question-circle" />
          </Popover>
        </span>
      ),
      key: 'dmpCrowdList',
      type: 'select',
      placeholder: '选择定向人群包',
      allowClear: true,
      validateFirst: true,
      rules: [
        {
          validator(rule, value = '', callback) {
            if (value.props) {
              callback('之前选择的人群包已删除，请重新选择定向人群包！');
              return;
            }
            callback();
          },
        },
      ],
      options: dmpCrowdList
        .filter(item => item.canSelect === true)
        .map(item => {
          return {
            ...item,
            text: item.label,
          };
        }),
    },
    osList: {
      width: 300,
      label: '手机操作系统',
      key: 'osList',
      type: 'UnCheckbox',
      allowClear: true,
      options: osList.map(item => {
        return {
          ...item,
          text: item.label,
        };
      }),
    },
    hideMore: {
      key: 'hideMore',
      type: 'hideMore',
      changeKeys: ['house', 'car', 'regionListText', 'osList'],
    },
    regionList: {
      label: '实时地址',
      key: 'regionListText',
      type: 'custom',
      render: function() {
        const treeData = [
          {
            canSelect: true,
            children: addTreeKey(regionList),
            key: 'selectAll',
            title: '全选',
            value: 'selectAll',
          },
        ];

        return (
          <div>
            <TagView
              TreeList={props.formData.regionList || []}
              TreeData={treeData[0].children}
              afterClose={self.handleTreeDelete}
              closeText="regionList"
            />
            <ModalFormView
              linkConfig={{ content: '选择实时地址>', linkType: 'a' }}
              modalConfig={{ title: '选择实时地址', width: 650 }}
              formConfig={[
                {
                  disabled: regionDisable,
                  key: 'regionList',
                  formItemLayout: {
                    labelCol: {
                      xs: { span: 24 },
                      sm: { span: 6 },
                    },
                    wrapperCol: {
                      xs: { span: 24 },
                      sm: { span: 24 },
                    },
                  },
                  type: 'multipleTree',
                  initialValue: props.formData.regionList || [],
                  treeData,
                  expandedKeys: ['selectAll'],
                },
              ]}
              handleSubmit={self.handleModelSubmit.bind(self)}
            />
          </div>
        );
      },
    },
    device: {
      type: 'formtitle',
      label: '设备定向',
    },
    deviceNetList: {
      label: '运营商',
      key: 'deviceNetList',
      type: 'UnCheckbox',
      width: 300,
      options: deviceNetList,
    },
    deviceNetworkList: {
      label: '网络类型',
      key: 'deviceNetworkList',
      type: 'UnCheckbox',
      width: 300,
      options: deviceNetworkList,
    },
    deviceTypeList: {
      label: '设备类型',
      key: 'deviceTypeList',
      type: 'UnCheckbox',
      width: 300,
      options: deviceTypeList,
    },
    userActiveTagList: {
      label: '用户活跃',
      key: 'userActiveTagList',
      type: 'radioGroup',
      width: 300,
      options: userActiveTagList.map(({ label, value }) => ({ text: label, value })),
      onChange: e => {
        const mediaTagListTwo = this.props.form.getFieldValue('mediaTagListTwo');
        if (sceneCode === 'XAB' && e.target.value === newUser && mediaTagListTwo) {
          if (mediaTagListTwo === ruanGaoyun || mediaTagListTwo === TANX) {
            this.props.form.resetFields([
              'genderTagList',
              'ageTagList',
              'regionList',
              'residenceLevelList',
              'residenceTagList',
            ]);
            this.props.updateData({
              ...formData,
              genderTagList: [],
              ageTagList: [],
              residenceTagList: [],
              residenceLevelList: [],
              regionList: [],
            });
          } else {
            this.props.updateData({
              ...formData,
              residenceTagList: [],
              residenceLevelList: [],
              regionList: [],
            });
            this.props.form.resetFields(['residenceTagList', 'residenceLevelList', 'regionList']);
          }
        }
      },
    },
    // mediaSceneList: {
    //   label: '投放范围',
    //   key: 'mediaSceneList',
    //   type: 'radioGroup',
    //   width: 300,
    //   options: mediaSceneList.map(({ mediaSceneName, mediaSceneValue }) => ({
    //     text: mediaSceneName,
    //     value: mediaSceneValue,
    //   })),
    //   rules: [
    //     {
    //       message: '不得为空',
    //       required: sceneCode === 'XAB',
    //     },
    //   ],
    //   onChange: e => {
    //     if (sceneCode === 'XAB' && this.props.form.getFieldValue('userActiveTagList') === newUser) {
    //       const mediaSceneList = e.target.value;
    //       if (mediaSceneList === ruanGaoyun || mediaSceneList === TANX) {
    //         this.props.form.resetFields([
    //           'genderTagList',
    //           'ageTagList',
    //           'residenceTagList',
    //           'residenceLevelList',
    //           'regionList',
    //         ]);
    //         this.props.updateData({
    //           ...formData,
    //           genderTagList: [],
    //           ageTagList: [],
    //           residenceTagList: [],
    //           residenceLevelList: [],
    //           regionList: [],
    //         });
    //       } else {
    //         this.props.form.resetFields(['residenceTagList', 'residenceLevelList', 'regionList']);
    //         this.props.updateData({
    //           ...formData,
    //           residenceTagList: [],
    //           residenceLevelList: [],
    //           regionList: [],
    //         });
    //       }
    //     }
    //   },
    // },
    mediaTagList: {
      label: '投放范围',
      key: 'mediaTagList',
      type: 'radioGroup',
      options: mediaArr.map(item => ({
        ...item,
        text: item.title,
      })),
      rules: [
        {
          message: '不得为空',
          required: true,
        },
      ],
      onChange: e => {
        let mediaArrTwoList = []; // 具体场景数据
        if (e.target.value) {
          mediaArrTwoList = getIn(
            mediaArr.find(item => item.value == e.target.value),
            ['children'],
            [],
          ).map(item => ({
            ...item,
            text: item.title,
          }));
        }
        this.setState(() => ({
          mediaArrTwo: mediaArrTwoList,
        }));
      },
    },
    mediaTagListTwo: {
      label: '具体场景',
      key: 'mediaTagListTwo',
      type: 'radioGroup',
      width: 300,
      rules: [
        {
          message: '不得为空',
          required: true,
        },
      ],
      options: mediaArrTwo,
    },
    adPosList: {
      label: '选择资源位',
      key: 'adPosList',
      type: 'select',
      width: 300,
      placeholder: '请选择资源位',
      options: mediaPosList.map(({ mediaPosId, mediaPosName }) => ({
        text: mediaPosName,
        value: mediaPosId,
      })),
      rules: [{ required: true, message: '请选择资源位' }],
      onChange: mediaId => {
        this.setState({ mediaId });
        sceneCode === 'APP' &&
          this.props.queryPrice.call(
            this,
            [mediaId],
            planId || this.props.form.getFieldValue('planId'),
          );
      },
      configRules: {
        REQUIRED: () => {
          return [
            {
              required: true,
              message: '请选择资源位',
            },
          ];
        },
      },
    },
    priceTitle: {
      label: '单价及订单总价',
      key: 'checkAppTitle',
      type: 'formtitle',
    },
    unitPrice: {
      label: '单价',
      key: 'unitPrice',
      type: 'custom',
      render: () => yuan(unitPrice[mediaId]),
    },
    totalPrice: {
      label: '订单总价',
      key: 'totalPrice',
      type: 'custom',
      render: () => yuan(totalPrice),
    },
    OCPC: {
      width: 300,
      label: (
        <span>
          使用oCPC智能出价{' '}
          <Popover
            content={`
            oCPC智能出价指根据您设置的转化目标和转化成本对各类资源实时优化的出价方式。
            使用oCPC出价后点击价格可能会高于当前设置的出价，但不会高于当前设置出价的2.5倍。
            使用oCPC前期需积累一定转化样本（一般是500+），勾选后如符合开启条件会自动调整成oCPC出价。
          `}
          >
            <Icon type="question-circle" />
          </Popover>
        </span>
      ),
      key: 'ocpxSwitch',
      type: 'checkboxGroup',
      options: [
        {
          value: 1,
          text: '',
        },
      ],
    },
    OCPM: {
      width: 300,
      label: (
        <span>
          使用oCPM智能出价{' '}
          <Popover
            content={`
            oCPM智能出价指根据您设置的转化目标和转化成本对各类资源实时优化的出价方式。
            使用oCPM出价后，CPM曝光价格可能会高于当前设置出价。使用oCPM出价前期需积累转化样本1000+，
            勾选后，如符合开启条件奖自动转化为oCPM出价。
          `}
          >
            <Icon type="question-circle" />
          </Popover>
        </span>
      ),
      key: 'ocpxSwitch',
      type: 'checkboxGroup',
      options: [
        {
          value: 1,
          text: '',
        },
      ],
    },
    conversionId: {
      width: 300,
      label: '选择转化目标',
      placeholder: '请选择转化事件',
      key: 'conversionId',
      type: 'select',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择转化事件',
        },
      ],
    },
    targetCpa: {
      width: 300,
      label: (
        <span>
          设置目标转化成本(元){' '}
          <Popover
            content={`
            转化成本设置过低会影响覆盖的用户量，建议联系小二合理设置
          `}
          >
            <Icon type="question-circle" />
          </Popover>
        </span>
      ),
      key: 'targetCpa',
      type: 'input',
      placeholder: '请输入0～9999.99之间是数字',
      validateFirst: true,
      rules: [
        {
          required: true,
          message: '出价不能为空，请输入',
        },
        {
          validator: function(rule, value, callback) {
            value = Number(value);
            if (value > 0 && value < 9999.99) {
              callback();
              return;
            }
            callback(`出价需在0~9999.99之间，请重新输入`);
          },
          message: `出价需在0~9999.99之间，请重新输入`,
        },
        {
          pattern: /^(([1-9]{0,1}[0-9]{0,4})|(([0]\.\d{1,2}|[1-9]{0,1}[0-9]{0,3}\.\d{1,2})))$/,
          message: '出价必须为2位小数，请重新输入',
        },
      ],
    },
    quantity: {
      key: 'quantity',
      type: 'input',
      label: '总量',
      placeholder: '请输入总量',
      width: 300,
      configRules: {
        REQUIRED: () => {
          return [
            {
              required: true,
              message: '总量不能为空，请输入',
            },
          ];
        },
        RANGE: ({ minFormat, maxFormat, minCanEqual, maxCanEqual }) => {
          return [
            {
              validator: function(rule, value, callback) {
                value = Number(value);
                if (
                  (value > Number(minFormat) && value < Number(maxFormat)) ||
                  (minCanEqual && value === Number(minFormat)) ||
                  (maxCanEqual && value === Number(maxFormat))
                ) {
                  callback();
                  return;
                }
                callback(
                  `总量需在${minFormat}~${maxFormat}之间，不能低于${minFormat}元，请重新输入`,
                );
              },
              message: `总量需在${minFormat}~${maxFormat}之间的数字，不能低于${minFormat}元，请重新输入`,
            },
          ];
        },
      },
    },
    cpaGroupCharge: {
      label: '出价（元）',
      key: 'groupCharge',
      type: 'input',
      placeholder: '请输入不小于3.0的数字',
      validateFirst: true,
      width: 300,
      rules: [
        {
          required: true,
          message: '出价不能为空，请输入',
        },
        {
          validator: function(rule, value, callback) {
            value = Number(value);
            if (value >= 3) {
              callback();
              return;
            }
            callback(`请输入不小于3.0的数字`);
          },
        },
      ],
    },
  };
}
