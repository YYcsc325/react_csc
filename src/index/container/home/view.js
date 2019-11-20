import React, { Component } from 'react';
import HockComponent from './hockComponents/view.js'
import HockComponent2 from './hockComponents/view2.js'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <span>render</span>
                <HockComponent />
                <HockComponent2 />
            </div>
        )
    }
}

Index.propTypes = {

}

export default Index