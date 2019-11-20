Array.prototype.showMeTheMoney = function showMeTheMoney(callback){
    let _this = this;
    let arr = []     // 如果修改元数据直接在this上进行修改，最后在把this抛出去
    if(_this && _this.length && typeof _this == 'object'){
        let len = _this.length;
        for( let i = 0; i < len; i++){
             arr.push(callback(_this[i], i))
        }
    }
    return arr;
}
let arr = [
    {
        name: 'cen',
        age: 27
    },
    {
        name: 'cen',
        age: 28
    }
]
let arr2 = arr.showMeTheMoney( (item)=> {
    return {
        ...item,
        sex: item.name
    }
});

let arr3 = arr2.map(item=>({...item}))