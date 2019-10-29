import React, { Component } from 'react';
// 使Counter能获得到Redux的state，并且能发射action。先来安装react-redux

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    console.log(this.props, 'this.props')
    // const {
    //   counter: { 
    //     count
    //  },
    //   increment,
    //   decrement,
    //   reset,
    // } = this.props;
    return (
      <div>
        你好
        {/* <div>
          当前计数为:
          { String(count) }
        </div>
        <button onClick={() => increment()}>自增</button>
        <button onClick={() => decrement()}>自减</button>
        <button onClick={() => reset()}>重置</button> */}
      </div>
    );
  }
}
export default Counter;
