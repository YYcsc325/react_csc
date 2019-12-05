/**
 * @name 配置文件
 */
import { getBaseConfig } from './baseConfig.js'
import React from 'react';

export function getConfig(props){
    const baseConfig = getBaseConfig.call(this);
    return [
        {
            type: 'select',
            label: '选择框',
            key: 'select',
            options: [{key: '123', value: '123'}],
            rules: [
                {
                    required: true,
                    message: '必填'
                }
            ],
            initialValue: '123',
            placeholder: '请选择'
        }
    ]
    .concat(
        [
            {
                ...baseConfig.input,
                disabled: false,
                onChange: (e) => {
                    this.onChange(e)
                }
            }   
        ]
    ).concat(
        [
            {
                ...baseConfig.custom
            }
        ]
    ).concat(
        [
            {
                ...baseConfig.double,
                options: [
                    {
                        key: '111',
                        value: '111'
                    },
                    {
                        key: '222',
                        value: '222'
                    }
                ],
                valueDateOne: '111',
                valueDataTwo: '111'
            }
        ]
    )
}