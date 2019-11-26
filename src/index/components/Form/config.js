import { baseGroupConfig } from '../Component/defaultConfig';
import { initOptions, concatFields, includesArr, getOcpxType } from '../../utils';
import { getIn } from '~/util/manipulate';
export default function(props, state) {
  const {
    planDataList: { list },
    sceneList, // 用户的信息
    mediaArr,
    form,
    wufuPackage,
  } = props;
  const { planId } = props.location.query;
  const {
    isCheckOcpx,
    planSceneData: { sceneCode, sellMode },
    mediaArrTwo = [],
    chargeType,
    newCpaConversionList,
    newConversionList = [],
  } = this.state;
  const _this = this;

  let sceneData = {};
  if (sceneCode) {
    sceneData =
      sceneList.find(item => {
        return item.code === sceneCode;
      }) || {};
  }
  let baseGroupConfigs = sceneData.group || { showFields: [] };

  let groupConfig = { ...baseGroupConfigs };

  if (sellMode === 'GD' && sceneCode === 'APP') {
    groupConfig.showFields = ['groupName', 'adPosList', 'priceTitle', 'unitPrice', 'totalPrice'];
  } else {
    groupConfig = baseGroupConfigs;
  }
  const { showFields } = groupConfig;
  const config = baseGroupConfig.call(this, props, showFields, sceneCode);

  // 获取智能出价type
  const isOcpx = getOcpxType(groupConfig, chargeType);

  return [
    {
      ...config.checkAppTitle,
    },
    {
      label: '计划名称',
      key: 'planId',
      type: 'select',
      placeholder: '请选择计划',
      width: 300,
      initialValue: Number(planId) || undefined,
      disabled: !!planId,
      options: initOptions(list, 'planName', 'planId'),
      onChange: planId => {
        this.props.getGroupTarget({ planId });
        this.changePlanId(planId);
        // this.props.getMediaSceneList(planId);
        // 直接新建单元 -- 每次需要触发mediataglist
        this.props.getMediaTagList.call(this, planId);
        // 获取计划详情，判断chargeType是否为CPA
        this.getDetails(planId);
        // this.props.getMediaSceneList(planId);
        // 智能出价模式 ocpxSwitch 置空 隐藏组件
        if (isOcpx) {
          this.props.form.setFieldsValue({ ocpxSwitch: [] });
          this.setState({ isCheckOcpx: false });
        }
      },
      rules: [
        {
          required: true,
          message: '请选择计划',
        },
      ],
    },
  ]
    .concat(
      concatFields({
        key: 'groupName',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'quantity',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'adPosList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      chargeType === 'CPA' && sceneCode === 'APP' // 判断chargeType是否为CPA
        ? [
            {
              ...config.conversionId,
              options: newCpaConversionList,
            },
          ].concat(
            newCpaConversionList.find(
              item =>
                item.conversionActionType === 'CPA_SIGN_IN' &&
                form.getFieldValue('conversionId') === item.conversionId,
            )
              ? [
                  {
                    ...config.cpaGroupCharge,
                  },
                ]
              : concatFields({
                  key: 'groupCharge',
                  showConfig: groupConfig,
                  config,
                }),
          )
        : concatFields({
            key: 'groupCharge',
            showConfig: groupConfig,
            config,
          }),
    )
    .concat(
      sceneCode === 'WU_FU'
        ? [
            {
              ...config.wufuPackage,
            },
            {
              ...config.profileName,
              render: function() {
                return <span>{getIn(wufuPackage, [0], {}).profileName}</span>;
              },
            },
            {
              ...config.description,
              render: function() {
                return <span>{getIn(wufuPackage, [0], {}).description}</span>;
              },
            },
          ]
        : [],
    )
    .concat(
      isOcpx
        ? [
            {
              ...config[isOcpx],
              onChange: value => {
                _this.setState({
                  isCheckOcpx: !!value.length,
                  ocpxType: isOcpx,
                });
              },
            },
          ].concat(
            isCheckOcpx
              ? [
                  {
                    ...config.conversionId,
                    options: newConversionList,
                    link: {
                      text: '去创建',
                      url: '/conversion/new',
                    },
                  },
                  {
                    ...config.targetCpa,
                  },
                ]
              : [],
          )
        : [],
    )

    .concat(
      includesArr(showFields, ['priceTitle'])
        ? [
            {
              ...config.priceTitle,
            },
          ]
        : [],
    )
    .concat(
      includesArr(showFields, ['unitPrice'])
        ? [
            {
              ...config.unitPrice,
            },
          ]
        : [],
    )
    .concat(
      includesArr(showFields, ['totalPrice'])
        ? [
            {
              ...config.totalPrice,
            },
          ]
        : [],
    )
    .concat(
      includesArr(showFields, [
        'mediaTradeList',
        'mediaRegionList',
        // 'mediaSceneList',
        'mediaTagList',
      ]) // 行业类型，设备所在地，投放范围 --> 就展示媒体定位
        ? [
            {
              ...config.media,
            },
          ]
        : [],
    )
    .concat(
      concatFields({
        key: 'mediaTagList',
        showConfig: groupConfig,
        config,
        options: {
          initialValue: getIn(mediaArr, [0, 'value'], undefined),
        },
      }),
    )
    .concat(
      concatFields({
        key: 'mediaTradeList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'mediaRegionList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      mediaArrTwo.length > 0
        ? {
            ...config.mediaTagListTwo,
            initialValue: mediaArrTwo[0].value,
          }
        : [],
    )
    .concat(
      includesArr(showFields, [
        'genderTagList',
        'ageTagList',
        'crowdList',
        'residenceTagList',
        'residenceLevelList',
        'interestTagList',
        'userActiveTagList',
      ])
        ? [
            {
              ...config.crowd,
            },
          ]
        : [],
    )
    .concat(
      concatFields({
        key: 'userActiveTagList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'genderTagList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'ageTagList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      includesArr(showFields, ['residenceTagList', 'residenceLevelList'])
        ? [
            {
              ...config.residenceTagList,
            },
          ]
        : [],
      // concatFields({
      //   key: 'residenceTagList',
      //   showConfig: groupConfig,
      //   config,
      // })
    )
    .concat(
      concatFields({
        key: 'interestTagList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'crowdList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'dmpCrowdList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: { key: 'regionList', value: 'hideMore' },
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'osList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'regionList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      includesArr(showFields, ['deviceNetList', 'deviceNetworkList', 'deviceTypeList'])
        ? [
            {
              ...config.device,
            },
          ]
        : [],
    )
    .concat(
      concatFields({
        key: 'deviceNetList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'deviceNetworkList',
        showConfig: groupConfig,
        config,
      }),
    )
    .concat(
      concatFields({
        key: 'deviceTypeList',
        showConfig: groupConfig,
        config,
      }),
    );
}
