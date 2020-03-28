// 字符串去重复
export function uniqueStr(arr){
    return [new Set([...arr])];
}
// 数组对象根据id去重复
export function unique(data){
    let obj = {}
    data = data.reduce((item,next)=>{  //next是另外一个参数
        obj[next.name]?'':obj[next.name] = true && item.push(next)
        return item
    },[])
    return data
}
/**
 * @name   非空
 * @param  { state原数据, array过滤字段['type'], initial默认值 }
 */
export function getIn(state, array, initial){
    let obj = Object.assign({}, state);

    for (let i = 0; i < array.length; i++) {
      // when is undefined  return init immediately
      if (typeof obj !== 'object' || obj === null) {
        return initial;
      }
  
      const prop = array[i];
  
      obj = obj[prop];
    }
  
    if (obj === undefined || obj === null) {
      return initial;
    }
  
    return obj;
}