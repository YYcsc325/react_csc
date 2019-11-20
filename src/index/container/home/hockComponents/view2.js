import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    // 还能return 一个 function , 相当于unmount，触发这个函数，清楚外部调用的数据
    // return () => {  ...代码逻辑 }   
  },[count]);     // 优化去对比count有无变化,变化执行effect

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default Example;