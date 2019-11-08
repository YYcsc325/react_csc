import React, { Component } from 'react'
import { Input } from 'antd';
import { debounce } from '../../../utils/indexAll'
class Index extends Component {
    constructor(props) {
        super(props)
        this.onChange = debounce.debounce(this.onChange,50)
        this.state = {

        }
    }

    componentDidMount() {

    }

    onChange = (e) => {
        console.log(e.target.value)
        if(e.target.value){
            this.props.getTarget();
        }
    }
    render() {
        return (
            <Input
                style={{width: '200px'}}
                onChange = { this.onChange }
            />
        )
    }
}


export default Index