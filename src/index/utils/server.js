/**
 * @name 导出数据
 */
import axios from 'axios';
GetUrl = ''
export default {
    getData = () => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"get",
                url:`${GetUrl}data`,
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })          
        })
    },
    getName = (req) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"post",
                url:PostUrl,
                data:req,
                header:{
                    content:"header-content"
                }
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}