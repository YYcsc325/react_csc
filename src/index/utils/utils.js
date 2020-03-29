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
// 将对象转成地址栏山的参数
/**
 * @author csc
 * @param {Object} obj 需要拼接的参数对象
 * @return {String}
 * */
export function objToQs(obj) {
  if(!obj && !Object.keys(obj).length) {
      return "";
  } else {
      var arr = [];
      for(var key in obj) {
          arr.push(key + "=" + obj[key]);
      }
      return arr.join("&");
  }
}
// 将地址栏上的参数转成对象
/**
 * @author csc
 * @param {String} url url地址栏
 * @return {Object}
 */
export function qsToObj(url) {
  var qs = url.split("?")[1];
  var arr = [];
  var res = {};
  if(!qs) {
      // return res;
  } else {
      arr = qs.split("&");
      for(var i = 0, len = arr.length; i < len; i++) {
          var key = arr[i].split("=")[0];
          var val = arr[i].split("=")[1];
          res[key] = decodeURIComponent(val);
      }
  }
  return res;
}