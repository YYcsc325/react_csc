//  最后执行的时候顺序是从后往前执行的，依次执行作用域上的函数，跟作用域中的数据       
function curry(fn,len){
    let leng = len || fn.length;                                        // fn.length是定义函数的时候形参的个数
    let func = function(fn){
        let _arg = [].slice.call(arguments,1);
        return function(){
            let newArgs = _arg.concat([].slice.call(arguments));        
            console.log('我是之前进来的')
            return fn.apply(this,newArgs);
        }
    }
    return function(){
        let argLen = arguments.length;
        if(argLen < leng){
            let formattedArr = [fn].concat([].slice.call(arguments));
            return curry(func.apply(this,formattedArr),leng - argLen)
        }else{
            console.log('最后进来的吗')
            return fn.apply(this,arguments)
        }
    }
}