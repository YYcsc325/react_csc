/*
 * 自己封装偏函数,封在Function上
 */
Function.prototype.partial = function(){
    let _self = this;
    let _args = [].slice.call(arguments);
    return function (){
        let newArgs = _args.concat([].slice.call(arguments));
        return _self.apply(this,newArgs);  // _self是当前this，指向调用它的这个函数
    }
}