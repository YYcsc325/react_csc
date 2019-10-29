import LoadComponent from '../component/Loading/index';
import React from '@alipay/bigfish/react';
import ReactDOM from 'react-dom';

function loading(){
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = React.createRef();
    ReactDOM.render(<LoadComponent ref={ref}/>,div);
    return {
        showLoading(isShowLoading = true){
            if(isShowLoading){
                return ref.current.showLoading();
            }else{
                return null
            }
        },
        hideLoading(){
            return ref.current.hideLoading();
        }
    }    
}
export default new loading();