import axios from 'axios'
const doMain = 'http://127.0.0.1:3000'
class Server {
    getParams = (url) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"get",
                url: `${doMain}${url}`
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    getQuery = (url,query) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"get",
                url:`${doMain}${url}`,
                params: query
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    post = (url, params) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"post",
                url:`${doMain}${url}`,
                data:params
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}
export default new Server()