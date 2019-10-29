/**
 * @name 请求处理
 */
import method from './method.js'
export function getData($get,path,params){
     method[$get](path,params);
}