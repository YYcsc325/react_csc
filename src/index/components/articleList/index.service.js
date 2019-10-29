import axios from 'axios';

const url = './data'

class Service {
    upload = (req) => {
        return new Promise((resolve,reject)=>{
             axios.post({
                 method:"post",
                 url:url,
                 data:req
             }).then(data=>{
                 resolve(data)
             }).catch(err=>{
                 console.log(err);
             })
        })
    }
}
export default new Service();