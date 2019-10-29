class debounce {
    /**
     * @title 函数去抖
     * @params func  wait  options
     */
    debounce = (func,wait,options) => {
        let lastArgs,
            lastThis,
            maxWait,
            result,
            timeId,
            lastCallTime

        //初始化参数
        let lastInvokeTime = 0;
        let leading = false;
        let maxing = false;
        let trailing = true;
        
        //基本的类型判断和处理
        if(typeof func != 'function'){
            throw new TypeError('传个函数进来')
        }

        wait = +wait || 0;

        function invokeFunc(time){
            const args = lastArgs;
            const thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg,args)
            return result
        }
        /**
         * @title 等待
         * @param {*} time 
         */
        function leadingEdge(time){
            lastInvokeTime = time;
            //为trailingedge 触发函数调用设定定时器
            timeId = setTimeout(timerExpired,wait);
            //leading == true  执行函数
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait (time) {
            //距离上一次debounce函数调用时间
            const tiemSinceLastCall = time -lastCallTime   
            //距离上次函数执行的时间
            const timeSinceLastInvoke = time - lastInvokeTime;
            //用wait减去timesincelastcall 计算出下次trailing
            const timeWaiting = wait - tiemSinceLastCall;


            //判断情况   有maxing：比较出下次maxing和下一次trailing的最小值  作为下次函数要执行的时间
            //          无maxing   在下一次trailing时执行  timerExpired
            return maxing ? Math.min(timeWaiting,maxWait-timeSinceLastInvoke) : timeWaiting
        }


        /**
         * @title 根据时间判断 
         * @params time
         */
        function shouldInvoke (time) {
            const timeSinceLastCall = time - lastCallTime;
            const timeSinceLastInvoke = time - lastInvokeTime;

            //几种满足条件的情况

            return (lastCallTime === undefined                 //首次
                || (timeSinceLastCall >= wait)                 //距离上次被调用已经超过wait
                || (timeSinceLastCall < 0)                     //系统时间倒退
                || (maxing && timeSinceLastInvoke >= maxWait)) //超过最大等待时间
        }

        function timerExpired () {
            const time = Date.now()

            //在trailing edge 且时间符合条件时 ，调用trailingEdge函数，否则重启定时器
            if(shouldInvoke(time)){
                return trailingEdge(time)
            }
            //重启定时器，保证下一次时延末尾触发
            timeId = setTimeout(timerExpired,remainingWait(time))
        }

        function trailingEdge (time) {
            timeId = undefined;

            //有lastargs才执行，意味着  只有func被debounce过一次以后  会在trailingedge执行

            if(trailing && lastArgs){
                return invokeFunc(time)
            }
            // 每次trailing 都会清除 lastargs 和 lastthis 目的时避免最后一次函数被执行了两次
            // 举个例子：最后一次函数执行时，可能恰巧时前一次的trailing edge  函数被调用  而这个函数又需要在自己时延的trailing edge 触发  导致触发多次
            lastArgs = lastThis = undefined;
            return result;
        }
        
        function cancel () {}
        function flush () {}
        function pending () {}

        function debounced (...args) {
            const time = Date.now()
            const isInvoking = shouldInvoke(time) //是否满足时间条件

            lastArgs = args
            lastThis = this;
            lastCallTime = time;  //函数被调用的时间

            if(isInvoking){
                if(timeId == undefined){          // 无timerid有两种情况  1: 首次调用  2: trailingedge执行过函数
                    return leadingEdge(lastCallTime)
                }
                if(maxing){
                    timeId = setTimeout(timerExpired,wait)
                    return invokeFunc(lastCallTime);
                }
            }
            //负责一种case  trailing为true的情况下，在前一个wait的trailingedge  已经执行了函数
            //而这次函数被调用时  shouldInvoke 不满足条件  因此设置定时器  在本次的trailing 保证函数被执行
            if(timeId === undefined){
                timeId = setTimeout(timerExpired,wait)
            }
            return result
        }
        debounced.cancel = cancel
        debounced.flush = flush
        debounce.pending = pending
        return debounced

    }
}
export default new debounce()