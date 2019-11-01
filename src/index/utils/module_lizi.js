/**
 * @name   随便到处一个数据
 * @params (*)
 * @des 描述过程
 */
 class Index1 {
     constructor(name,age){
         this.name = name;
         this.age = age;
     }
 }
 class Index extends Index1{
     constructor(...val){ //name
        super(...val)     //name    相当于Index1.call(...val)
     }
     getName(){                     // 能够定义会改变this的指向，需要函数调用的死后用call,apply,bind.绑定一下
         console.log(this.name);
     }
     getAge = () => {
         console.log(this.age);
     }
 }
 let obj = new Index('my name is Robert',24);
 export {
     obj,
 }
 //export default new Index('my name is Robert')

 function show( obj ){
     this.name = obj.name;
     this.age = obj.age;
     this.sex = obj.sex;
 }
 show.prototype = {
     getName(){
         return this.name;
     },
     getAge:function(){
         return this.age;
     }
 }
 function doIt( obj ){
     show.call(this,obj);
 }
 doIt.prototype = {
     getName(){
         return this.name;
     }
 }
 let newObj = new doIt({
     name: 'xixi',
     age: 24,
     sex: 'boy'
 })
 console.log(newObj.getName())