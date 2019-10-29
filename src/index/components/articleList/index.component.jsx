import React, { Component } from 'react'
import { Upload,Button } from 'antd';
import state from './index.state';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Upload
                    fileList = { state.fileList }
                    beforeUpload = { state.beforeUpload }
                    onRemove = { state.onRemove }
                >
                  <Button>点击上传</Button>
                </Upload>
            </div>
        )
    }
}


export default Index