import React, { Component } from 'react'

class ChildView extends Component {
    render(){
      const { show }  = this.props;
        return (
           <div>
              {
                show ?
                <span>我被show了</span> :
                <span>我被close了</span>
              }
            </div>
        )

    }
}

export default ChildView;