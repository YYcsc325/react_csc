import React, { Component } from 'react';
import './index.less';
// 使Counter能获得到Redux的state，并且能发射action。先来安装react-redux

export default class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: ''
    }
  }
  add = () => {
    this.setState((preState) => ({
      count: ++preState.count
    }))
  }
  remove = () => {
    this.setState((preState) => ({
      count: --preState.count
    }))
  }
  reset = () => {
    this.setState({
      count: 0
    })
  }
  render() {
    return (
      <div>
        <button onClick={()=>{this.add()}}>自增</button>
        <button onClick={this.remove}>自减</button>
        <button onClick={this.reset.bind(this)}>重置</button>
        <p className='count'>{this.state.count == '' ? 0 : this.state.count}</p>
      </div>
    )
  }
}
