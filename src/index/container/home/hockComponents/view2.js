import React, { useState, useEffect, useCallback, useMemo} from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    // 还能return 一个 function , 相当于unmount，触发这个函数，清楚外部调用的数据
    // return () => {  ...代码逻辑 }   
  },[count]);     // 优化去对比count有无变化,变化执行effect

  const memoizedCallback = useCallback(        // 该回调记忆函数仅在某个依赖项改变时才会更新
    () => {
        setCount(count - 1);
    },
    [count],
  );

  const computeExpensiveValue = (count) => {   // 只要count改变就会走这个函数
      return count * 2 + '我是计算过之后的值'
  }
  const memoizedValue = useMemo(() => computeExpensiveValue(count), [count]);

  return (
    <div>
      <p>You clicked { memoizedValue } times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <br/>
      <br/>
      <button onClick={()=>{memoizedCallback()}}>memoizedCallback</button>
    </div>
  );
}
export default Example;