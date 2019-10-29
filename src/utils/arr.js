class Index{
    //字符串去重
    uniqueStr = (arr) => {
        return [new Set([...arr])];
    }
    //对象的去重
    unique = (data) => {
        let obj = {}
        data = data.reduce((item,next)=>{  //next是另外一个参数
            obj[next.name]?'':obj[next.name] = true && item.push(next)
            return item
        },[])
        return data
    }    
}

export default new Index()