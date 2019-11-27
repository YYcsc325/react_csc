/**
 * @name 请求处理待完善
 */
import server from './server.js'

export function getData(path){
   return server['getParams'](path);
}
export function postData(path,params){
   return server['post'](path,params);
}