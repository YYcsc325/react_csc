import React, { Component } from 'react'
import '../index.less';
let mockData = [
    {
        href: 'https://www.baidu.com/',
        title: 'Connect with Google+',
        name: 'Log in with Google'
    }
]
class RedicretComponent extends Component {
    render(){
        const { name = '', rel = '', title = '', style = {} } = this.props;
        const { backgroundColorHover, opacity, ...reset } = style;
        return (
            <a 
              rel={rel} 
              ref={(ref)=>{this.aRef = ref}}
              title={title} 
              style={{...reset}}
              className={rel}
              onMouseOver={()=>{
                  this.aRef.style.backgroundColor = backgroundColorHover
                  this.aRef.style.opacity = opacity
              }}
              onMouseOut={() => {
                  this.aRef.style.backgroundColor = style.backgroundColor
                  this.aRef.style.opacity = 1
              }}
            >{name}</a>   
        )
    }
}
export default RedicretComponent