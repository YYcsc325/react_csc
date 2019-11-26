import LoadComponent from './index';
import React from 'react';
import ReactDOM from 'react-dom';
// import * as ReactDOM from 'react-dom';

function loading() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const ref = React.createRef();
  ReactDOM.render(<LoadComponent ref={ref} />, div);
  return {
    showLoading: ref.current.showLoading,
    hideLoading: ref.current.hideLoading,
  };
}
export default new loading();
