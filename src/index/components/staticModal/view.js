import React, { Component, useState, useEffect, useCallback, useMemo } from 'react'
import { Modal } from 'antd';

const Example = (props) => {
    const { visible, ...reset } = props;
    useEffect(() => {
         
    },[visible]);
    return (
        <Modal 
            visible={visible}
            { ...reset }
        />
    )
}
const showModal = (props) => {
    alert('static属性有什么用?')
}

class StaticModal extends Component {
    static getshow  = (props) => { showModal(props) }
    render(){
        return <Example { ...this.props }/>
    }
}

export default StaticModal;