import axios from 'axios'
class Index {
    getUrl = (url) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"get",
                url:`${url}/login`
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    getParams = (url,params) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"get",
                url:url,
                params:params
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
    post = (url,params) => {
        return new Promise((resolve,reject)=>{
            axios({
                method:"post",
                url:url,
                data:params
            }).then(data=>{
                resolve(data)
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}
export default new Index()