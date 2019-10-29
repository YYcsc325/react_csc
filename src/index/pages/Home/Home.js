import React, { Component } from 'react';
import sliStr from 'react-utils-csc';
const str = 'abcdefg';

class Home extends Component {
    render() {
        return (
            <div>
                {
                   sliStr(str) 
                }
                this is home ~hi xht
            </div>
        )
    }
}
export default Home;