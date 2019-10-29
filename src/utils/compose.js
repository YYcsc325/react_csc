function splits(str){
    return str.split('');
}
function reverses(str){
    return str.reverse()
}
function join(str){
    return str.join('-')
}
// 一般函数组合的写法->其实就是利用必包的模式  -->  抓住的compose2的作用域，两个function
function compose2(f,g){
    return function(x){
        return f(g(x))
    }
}
//--------------> 相当于   const compose2 = (f,g) => x => f(g(x))
/**
 *@name     函数组合
 *@params   { argumensts } 每个传入的function
 */
function compose(){
    let args = Array.prototype.slice.call(arguments);    // 伪数组调用真数组的方法   args为传入function的数组
    let len = args.length - 1;
    return function(x){
        let res = args[len](x);
        while(len--){
            res = args[len](res)
        }
        return res
    }
}
function compose2(){
    let args = Array.prototype.slice.call(arguments);    // 伪数组调用真数组的方法   args为传入function的数组
    let len = args.length - 1;
    return function(x){
        return args.reduceRight((pre,cur)=>{             // args从右往左执行,pre(初始值, 或者计算结束后的返回值),cur(当前元素)->是个function, pre不是函数是因为经过计算后的返回值了
            return cur(pre)
        },x)                                             // return出来的值会从新赋值给这个x,每次处理完一个函数给这个x赋值,每次执行完的return出去的值给x（相当于就是pre）
    }
}