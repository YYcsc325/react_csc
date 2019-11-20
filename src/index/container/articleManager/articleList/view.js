import React, { Component } from 'react'
import FatherView from './components/fatherView'
import ChildView from './components/childView'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    showClick = () => {
        
    }
    
    render() {
        return (
            <div>
                <span>文章列表</span>
                <FatherView show = {
                    showFlag => <ChildView show = {showFlag}/> 
                }
                />
            </div>
        )
    }
}


export default Index