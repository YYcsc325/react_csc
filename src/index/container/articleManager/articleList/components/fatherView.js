import React, { Component } from 'react'
import { Button } from 'antd';
class FatherView extends Component {
    constructor(props){
        super(props)
        this.state = {
            showFlag: false
        }
    }
    showClick = () => {
        this.setState((preState)=>({
            showFlag : !preState.showFlag
        }))
    }
    render(){
        return (
          <div>
              <Button onClick={this.showClick}>点击翻转</Button>
            {
             this.props.show(this.state.showFlag)
            }
          </div>
        )
    }
}

export default FatherView;