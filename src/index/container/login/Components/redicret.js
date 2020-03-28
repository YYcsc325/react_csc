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
        const { name = '', rel = '', title = '', style = {}, imgUrl = '' } = this.props;
        const { backgroundColorHover, opacity, ...reset } = style;
        return (
            <a 
              rel={rel} 
              ref={(ref)=>{this.aRef = ref}}
              title={title} 
              style={{...reset}}
              onMouseOver={()=>{
                  this.aRef.style.backgroundColor = backgroundColorHover
                  this.aRef.style.opacity = opacity
              }}
              onMouseOut={() => {
                  this.aRef.style.backgroundColor = style.backgroundColor
                  this.aRef.style.opacity = 1
              }}
            ><img src={imgUrl}></img>{name}</a>   
        )
    }
}
export default RedicretComponent