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

class StaticModal extends Component {
    static getshow  = (props) => { Example(props) }
    render(){
        return <Example { ...this.props }/>
    }
}

export default StaticModal;