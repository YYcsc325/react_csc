/**
 * @name 请求处理待完善
 */
import server from './server.js'

export function getParams(url, params){
   return server['getParams'](url, params);
}
export function getQuery(url, query){
   return server['getQuery'](url, query)
} 
export function post(url, params){
   return server['post'](url, params);
}