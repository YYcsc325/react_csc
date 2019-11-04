/**
 * @name Loading效果
 */
import React, { Component } from 'react'
import './index.less';

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    // 展示loading
    showLoading = () => {
        this.setState({
            loading: true
        })
    }
    // 关闭loading
    hideLoading = () => {
        this.setState({
            loading: false
        })
    }
    render(){
        return (
            <div className={this.state.loading ? 'loading' : 'loading hide'}>
                <div className='spinner'>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
            </div>
        )
    }
}
export default Index;
