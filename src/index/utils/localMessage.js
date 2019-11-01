class localMessage {
    //存入必须时字符串   所以对象得转成对象字符串

    //获取
    getlocal = (str) => {
        try{
            if(window){
                if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
                    const local_message = JSON.parse(window.localStorage.getItem(str)) || {}
                    return local_message;
                }
            }
        }catch(err){
            console.log(err,'err')
        }
    }

    //设置
    setlocal = (str,obj) => {
        try{
            if(window){
                if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
                    localStorage.setItem(str,JSON.parse(obj))
                }
            }
        }catch(err){
            console.log(err,'err')
        }
    }

    //删除
    removelocal = (str) => {
        try{
            if(window){
                if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
                    localStorage.removeItem(str)
                }
            }
        }catch(err){
            console.log(err,'err')
        }
    }


    // 操作sessio

    //添加
    getSession = (str) => {
        try{
            if(window){
                if(window.Storage && window.sessionStorage && window.sessionStorage instanceof Storage){
                    const session_message = JSON.parse(window.sessionStorage.getItem(str)) || {}
                    return session_message;
                }
            }
        }catch(err){
            console.log(err,'err')
        }
    }

    //获取
    setSession = (str,obj) => {
        try{
            if(window){
                if(window.Storage && window.sessionStorage && window.sessionStorage instanceof Storage){
                    sessionStorage.setItem(str,JSON.parse(obj));
                }
            }
        }catch(err){
            console.log(err,'err')
        }
    }

    //设置cookie
    setCookie = (name,value,liveMinutes) => {
        if(liveMinutes == undefined || liveMinutes == null){
              liveMinutes = 60 * 1;
        }
        if(typeof (liveMinutes) != 'number'){
            liveMinutes = 60 * 24  //默认一天
        }
        var minutes = liveMinutes * 60 * 1000;
        var exp = new Date();
        exp.setTime(exp.getTime() + minutes + 8 * 3600 * 1000);
        document.cookie = name + '=' + value + ';path=/;expires' + exp.toUTCString();
    }

    //获取cookie
    getCookie = (cname) => {
        var name = cname + '=';
        var ca = document.cookie.split(';')
        for(var i = 0; i < ca.length; i++){
            var c = ca[i].trim();
            if(c.indexOf(name) == 0)return c.substring(name.length,c.length);
        }
    }

    //删除所有cookie
    clearAllCookie = () => {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys){
            for(var i = 0; i < keys.length; i++){
                var val = this.getCookie(keys[i]);
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
    
    //删除制定得cookie
    delCookie = (name) => {
         var exp = new Date();
         exp.setTime(exp.getTime() + (-1 * 24 * 60 * 1000));
         var cval = this.getCookie(name);
         document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString();
    }
}
export default new localMessage()